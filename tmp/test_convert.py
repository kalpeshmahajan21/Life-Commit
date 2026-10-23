import subprocess
import os
import math

width, height = 960, 540
fps = 30
duration = 8
total_frames = fps * duration

tmp_dir = "/tmp/planner_frames"
os.makedirs(tmp_dir, exist_ok=True)

# Generate frames as SVG and convert via ImageMagick to PNG
# To make it fast, let's generate 4 keyframe SVGs or 8 keyframes and let ffmpeg interpolate or create 30 frames per second with a simple generator.
# Actually, generating 240 frames with python writing SVG and convert might take 15 seconds.
# Let's see: how fast is ImageMagick convert on one SVG?
sample_svg = """<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540">
  <rect width="960" height="540" fill="#0A0F1D"/>
  <circle cx="480" cy="270" r="100" fill="#10B981"/>
</svg>"""

with open("/tmp/test.svg", "w") as f:
    f.write(sample_svg)

res = subprocess.run(["convert", "/tmp/test.svg", "/tmp/test.png"], capture_output=True)
print("Convert returncode:", res.returncode)
