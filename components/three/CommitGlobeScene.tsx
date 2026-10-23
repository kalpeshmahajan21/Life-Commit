'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Key developer cities specified by user
const HUBS = [
  { lat: 37.77, lon: -122.41, name: 'San Francisco', commits: '14,280' },
  { lat: 40.71, lon: -74.0, name: 'New York', commits: '12,940' },
  { lat: 51.5, lon: -0.12, name: 'London', commits: '11,400' },
  { lat: 52.52, lon: 13.4, name: 'Berlin', commits: '8,750' },
  { lat: 12.97, lon: 77.59, name: 'Bengaluru', commits: '15,620' },
  { lat: 35.67, lon: 139.65, name: 'Tokyo', commits: '9,820' },
  { lat: 1.35, lon: 103.81, name: 'Singapore', commits: '6,410' },
  { lat: -33.86, lon: 151.2, name: 'Sydney', commits: '5,190' },
];

// Connectivity pairs between developer hubs
const ARC_PAIRS: [number, number][] = [
  [0, 1], // San Francisco <-> New York
  [1, 2], // New York <-> London
  [2, 3], // London <-> Berlin
  [2, 4], // London <-> Bengaluru
  [4, 6], // Bengaluru <-> Singapore
  [6, 5], // Singapore <-> Tokyo
  [5, 0], // Tokyo <-> San Francisco
  [6, 7], // Singapore <-> Sydney
];

// Geographic helper: Convert lat/long to 3D Cartesian coordinates
function latLongToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Geographic helper: Reverse Cartesian unit sphere to lat/long
function vector3ToLatLong(x: number, y: number, z: number): { lat: number; lon: number } {
  const phi = Math.acos(Math.max(-1, Math.min(1, y)));
  const lat = 90 - (phi * 180) / Math.PI;
  const theta = Math.atan2(z, -x);
  let lon = (theta * 180) / Math.PI - 180;
  while (lon > 180) lon -= 360;
  while (lon < -180) lon += 360;
  return { lat, lon };
}

// Continental boundary classification
function isContinentalLandmass(lat: number, lon: number): boolean {
  let normalizedLon = lon;
  while (normalizedLon > 180) normalizedLon -= 360;
  while (normalizedLon < -180) normalizedLon += 360;

  // North America
  if (lat >= 14 && lat <= 72 && normalizedLon >= -168 && normalizedLon <= -52) {
    if (lat < 28 && normalizedLon > -78) return false;
    return true;
  }

  // Central America
  if (lat >= 7 && lat <= 20 && normalizedLon >= -105 && normalizedLon <= -75) return true;

  // South America
  if (lat >= -56 && lat <= 13 && normalizedLon >= -82 && normalizedLon <= -34) {
    if (lat < -18 && normalizedLon > -48) return false;
    return true;
  }

  // Europe & Scandinavia
  if (lat >= 35 && lat <= 72 && normalizedLon >= -10 && normalizedLon <= 42) {
    if (lat < 42 && normalizedLon > 2 && normalizedLon < 22 && lat > 36) {
      if ((normalizedLon > 10 && normalizedLon < 16 && lat > 37) || (normalizedLon > 20 && normalizedLon < 26)) return true;
      if (normalizedLon < 4) return true;
      return false;
    }
    return true;
  }

  // Africa
  if (lat >= -35 && lat <= 37 && normalizedLon >= -18 && normalizedLon <= 52) {
    if (lat > 25 && normalizedLon < -14) return false;
    if (lat < -12 && normalizedLon > 42) return false;
    return true;
  }

  // Asia / Russia / Indian Subcontinent
  if (lat >= 5 && lat <= 75 && normalizedLon >= 25 && normalizedLon <= 180) {
    // Arabian Peninsula
    if (lat >= 12 && lat <= 32 && normalizedLon >= 35 && normalizedLon <= 60) return true;
    // Indian Subcontinent
    if (lat >= 8 && lat <= 35 && normalizedLon >= 68 && normalizedLon <= 90) return true;
    // Main continent
    if (lat >= 18 && normalizedLon >= 60) return true;
    // Southeast Asia
    if (lat >= -10 && lat <= 22 && normalizedLon >= 95 && normalizedLon <= 145) return true;
  }

  // Japan
  if (lat >= 30 && lat <= 46 && normalizedLon >= 129 && normalizedLon <= 146) return true;

  // Australia & New Zealand
  if (lat >= -44 && lat <= -10 && normalizedLon >= 112 && normalizedLon <= 154) return true;
  if (lat >= -48 && lat <= -34 && normalizedLon >= 165 && normalizedLon <= 179) return true;

  // UK & Ireland
  if (lat >= 50 && lat <= 60 && normalizedLon >= -11 && normalizedLon <= 2) return true;

  return false;
}

// Generate smooth circular dot texture for point cloud particles
function createCircleDotTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.9)');
  gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.3)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(32, 32, 30, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default function CommitGlobeScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedHub, setSelectedHub] = useState<typeof HUBS[0] | null>(null);
  const [showControls, setShowControls] = useState(false);

  // Target rotation coordinates for interactive centering
  const targetRotationRef = useRef({ x: 0.25, y: 0.3 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 520;

    // 1. Scene, Camera, WebGL Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#070D1F', 0.05);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight('#10B981', 1.6);
    dirLight1.position.set(5, 4, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight('#6366F1', 1.0);
    dirLight2.position.set(-5, -2, -3);
    scene.add(dirLight2);

    // Master rotating globe group
    const globeMasterGroup = new THREE.Group();
    scene.add(globeMasterGroup);

    const globeRadius = 1.85;

    // 3. Dark Occlusion Sphere Inside (radius * 0.98, color #070D1F)
    const occlusionGeo = new THREE.SphereGeometry(globeRadius * 0.98, 48, 48);
    const occlusionMat = new THREE.MeshBasicMaterial({
      color: 0x070d1f,
    });
    const occlusionSphere = new THREE.Mesh(occlusionGeo, occlusionMat);
    globeMasterGroup.add(occlusionSphere);

    // 4. Fibonacci Point-Cloud Matrix (2,800 points)
    const numPoints = 2800;
    const positions = new Float32Array(numPoints * 3);
    const colors = new Float32Array(numPoints * 3);
    const phi = Math.PI * (Math.sqrt(5) - 1); // Golden ratio angle

    const oceanColor = new THREE.Color('#1E293B');
    const landColorPrimary = new THREE.Color('#10B981');
    const landColorBright = new THREE.Color('#34D399');

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2; // y: 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const unitX = Math.cos(theta) * radiusAtY;
      const unitY = y;
      const unitZ = Math.sin(theta) * radiusAtY;

      const { lat, lon } = vector3ToLatLong(unitX, unitY, unitZ);
      const isLand = isContinentalLandmass(lat, lon);

      // Points on land are slightly elevated for crisp 3D relief
      const r = isLand ? globeRadius * 1.008 : globeRadius;

      positions[i * 3] = unitX * r;
      positions[i * 3 + 1] = unitY * r;
      positions[i * 3 + 2] = unitZ * r;

      if (isLand) {
        // Vary between emerald and mint for realistic commit topography
        const isBright = (i % 3 === 0);
        const col = isBright ? landColorBright : landColorPrimary;
        colors[i * 3] = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;
      } else {
        colors[i * 3] = oceanColor.r;
        colors[i * 3 + 1] = oceanColor.g;
        colors[i * 3 + 2] = oceanColor.b;
      }
    }

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointsGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const dotTexture = createCircleDotTexture();
    const pointsMat = new THREE.PointsMaterial({
      size: 0.052,
      vertexColors: true,
      map: dotTexture,
      transparent: true,
      alphaTest: 0.02,
      depthWrite: false,
    });

    const pointsMesh = new THREE.Points(pointsGeo, pointsMat);
    globeMasterGroup.add(pointsMesh);

    // 5. Glowing Hub Nodes & Pulsing Beacons
    const beaconsGroup = new THREE.Group();
    globeMasterGroup.add(beaconsGroup);

    const beaconCores: THREE.Mesh[] = [];
    const beaconHalos: THREE.Mesh[] = [];

    const hubCoreGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const hubCoreMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
    });

    const haloGeo = new THREE.RingGeometry(0.055, 0.085, 24);

    HUBS.forEach((hub) => {
      const pos = latLongToVector3(hub.lat, hub.lon, globeRadius * 1.015);

      // Inner glowing core sphere
      const core = new THREE.Mesh(hubCoreGeo, hubCoreMat);
      core.position.copy(pos);
      beaconsGroup.add(core);
      beaconCores.push(core);

      // Outer pulsing halo ring oriented tangentially
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.copy(pos);
      halo.lookAt(new THREE.Vector3(0, 0, 0));
      beaconsGroup.add(halo);
      beaconHalos.push(halo);
    });

    // 6. Smooth CatmullRomCurve3 Bezier Neon Arcs (opacity: 0.55)
    const arcsGroup = new THREE.Group();
    globeMasterGroup.add(arcsGroup);

    const arcCurves: THREE.CatmullRomCurve3[] = [];
    const packetMeshes: THREE.Mesh[] = [];

    const arcMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });

    const packetGeo = new THREE.SphereGeometry(0.025, 8, 8);
    const packetMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    ARC_PAIRS.forEach(([idxA, idxB]) => {
      const pA = latLongToVector3(HUBS[idxA].lat, HUBS[idxA].lon, globeRadius * 1.01);
      const pB = latLongToVector3(HUBS[idxB].lat, HUBS[idxB].lon, globeRadius * 1.01);

      // Compute elevated midpoint arching into space
      const mid = new THREE.Vector3().addVectors(pA, pB).multiplyScalar(0.5);
      const dist = pA.distanceTo(pB);
      mid.normalize().multiplyScalar(globeRadius + dist * 0.35);

      const curve = new THREE.CatmullRomCurve3([pA, mid, pB]);
      arcCurves.push(curve);

      // Tube along bezier curve
      const tubeGeo = new THREE.TubeGeometry(curve, 44, 0.008, 6, false);
      const tubeMesh = new THREE.Mesh(tubeGeo, arcMat);
      arcsGroup.add(tubeMesh);

      // Traveling commit pulse packet
      const packet = new THREE.Mesh(packetGeo, packetMat);
      arcsGroup.add(packet);
      packetMeshes.push(packet);
    });

    // 7. Grounding shadow vignette disk at base
    const shadowGeo = new THREE.CircleGeometry(globeRadius * 1.35, 48);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x020617,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -globeRadius * 1.15;
    scene.add(shadowMesh);

    // 8. Interaction: Pointer Drag & Rotation Physics
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let currentRotationY = 0.3;
    let currentRotationX = 0.25;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
      renderer.domElement.style.cursor = 'grabbing';
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevPointerX;
      const deltaY = e.clientY - prevPointerY;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;

      targetRotationRef.current.y += deltaX * 0.005;
      targetRotationRef.current.x = Math.max(-0.6, Math.min(0.8, targetRotationRef.current.x + deltaY * 0.005));
    };

    const onPointerUp = () => {
      isDragging = false;
      renderer.domElement.style.cursor = 'grab';
    };

    const domEl = renderer.domElement;
    domEl.style.cursor = 'grab';
    domEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 9. Animation Loop
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Calming automatic idle rotation when user is not dragging
      if (!isDragging) {
        targetRotationRef.current.y += delta * 0.12;
      }

      // Exponential damping transition
      const dampingFactor = 1 - Math.exp(-8 * delta);
      currentRotationY += (targetRotationRef.current.y - currentRotationY) * dampingFactor;
      currentRotationX += (targetRotationRef.current.x - currentRotationX) * dampingFactor;

      globeMasterGroup.rotation.y = currentRotationY;
      globeMasterGroup.rotation.x = currentRotationX;

      // Pulse beacon rings
      const pulseTime = now * 0.003;
      const pulseScale = 1 + Math.sin(pulseTime) * 0.22;
      beaconHalos.forEach((halo, i) => {
        halo.scale.set(pulseScale, pulseScale, pulseScale);
        const mat = halo.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.4 + Math.sin(pulseTime + i) * 0.3;
      });

      // Animate packet packets along bezier curves
      const packetCycle = (now * 0.00045) % 1;
      arcCurves.forEach((curve, i) => {
        const offset = (packetCycle + i * 0.12) % 1;
        const pt = curve.getPointAt(offset);
        if (packetMeshes[i]) {
          packetMeshes[i].position.copy(pt);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // 10. Clean Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      domEl.removeEventListener('pointerdown', onPointerDown);

      renderer.dispose();
      occlusionGeo.dispose();
      occlusionMat.dispose();
      pointsGeo.dispose();
      pointsMat.dispose();
      dotTexture.dispose();
      hubCoreGeo.dispose();
      hubCoreMat.dispose();
      haloGeo.dispose();
      beaconHalos.forEach((h) => (h.material as THREE.Material).dispose());
      packetGeo.dispose();
      packetMat.dispose();
      arcMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();

      if (domEl.parentNode) {
        domEl.parentNode.removeChild(domEl);
      }
    };
  }, []);

  // Center globe smoothly on selected city
  const handleSelectCity = (hub: typeof HUBS[0]) => {
    setSelectedHub(hub);
    targetRotationRef.current.y = -(hub.lon * Math.PI) / 180 - Math.PI / 2;
    targetRotationRef.current.x = ((hub.lat * Math.PI) / 180) * 0.4;
  };

  return (
    <div className="relative w-full h-[520px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#070D1F] via-[#0A132C] to-[#070D1F] border border-white/10 shadow-2xl">
      {/* 3D WebGL Canvas Mount Container */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Top-Left Spec Badge */}
      <div className="absolute top-5 left-6 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs font-medium text-slate-200 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Stripe-Style 3D Matrix • Fibonacci Point Cloud</span>
      </div>

      {/* Top-Right Quick Stats */}
      <div className="absolute top-5 right-6 flex items-center gap-2">
        <span className="px-3 py-1 rounded-full text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 backdrop-blur-md">
          62,000+ Active Commits
        </span>
      </div>

      {/* Interactive Hub Quick Selector Pills */}
      <div className="absolute top-16 left-6 right-6 flex flex-wrap gap-1.5 pointer-events-auto">
        {HUBS.map((hub) => (
          <button
            key={hub.name}
            onClick={() => handleSelectCity(hub)}
            className={`text-[11px] px-2.5 py-1 rounded-full transition-all border cursor-pointer ${
              selectedHub?.name === hub.name
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-md'
                : 'bg-slate-900/60 text-slate-300 hover:text-white border-white/10 hover:border-white/20 backdrop-blur-xs'
            }`}
          >
            {hub.name} ({hub.commits})
          </button>
        ))}
      </div>

      {/* Hub Detail Popover if selected */}
      {selectedHub && (
        <div className="absolute bottom-16 left-6 right-6 md:right-auto md:w-80 p-4 rounded-2xl bg-slate-950/95 border border-emerald-500/40 text-white shadow-2xl backdrop-blur-md z-20">
          <div className="flex justify-between items-start mb-1">
            <h4 className="text-sm font-bold text-emerald-400">{selectedHub.name} Node</h4>
            <button
              onClick={() => setSelectedHub(null)}
              className="text-xs text-slate-400 hover:text-white cursor-pointer px-1"
            >
              ✕
            </button>
          </div>
          <p className="text-xs text-slate-300">
            Monthly commits synced: <span className="text-white font-semibold">{selectedHub.commits}</span>
          </p>
          <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Active sync interval: 15s • AES-256 local encrypted
          </div>
        </div>
      )}

      {/* Collapsible Unified Bottom Control Dock */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
        <button
          onClick={() => setShowControls(!showControls)}
          className="text-[11px] px-3 py-1 rounded-t-lg bg-slate-900/90 border-t border-x border-white/15 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>{showControls ? '▾ Hide 3D Controls' : '▴ Inspect 3D Globe'}</span>
        </button>

        {showControls && (
          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-950/95 border border-white/15 text-xs text-slate-300 shadow-2xl backdrop-blur-md">
            <span className="text-[11px] text-slate-400">Drag to rotate</span>
            <div className="h-3 w-[1px] bg-slate-700" />
            <span className="text-[11px] text-emerald-400">8 Global Data Hubs</span>
            <div className="h-3 w-[1px] bg-slate-700" />
            <button
              onClick={() => handleSelectCity(HUBS[0])}
              className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] hover:bg-emerald-900 cursor-pointer"
            >
              SF Hub
            </button>
            <button
              onClick={() => handleSelectCity(HUBS[4])}
              className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] hover:bg-emerald-900 cursor-pointer"
            >
              Bengaluru Hub
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
