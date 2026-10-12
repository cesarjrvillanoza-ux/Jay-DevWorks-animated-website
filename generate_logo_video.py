import subprocess
import math
import struct
import sys

WIDTH = 960
HEIGHT = 540
FPS = 24
DURATION = 8
TOTAL_FRAMES = FPS * DURATION

# Start ffmpeg subprocess that reads raw RGB24 frames from stdin
ffmpeg_cmd = [
    'ffmpeg', '-y',
    '-f', 'rawvideo',
    '-vcodec', 'rawvideo',
    '-s', f'{WIDTH}x{HEIGHT}',
    '-pix_fmt', 'rgb24',
    '-r', str(FPS),
    '-i', '-',
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-preset', 'medium',
    '-crf', '18',
    'public/assets/vid/logo.mp4'
]

proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE)

print(f"Rendering {TOTAL_FRAMES} frames of animated logo...")

# Precompute gear points
def make_gear(cx, cy, r_outer, r_inner, teeth, angle):
    points = []
    step = 2 * math.pi / teeth
    for i in range(teeth):
        a0 = angle + i * step
        a1 = a0 + step * 0.25
        a2 = a0 + step * 0.5
        a3 = a0 + step * 0.75
        a4 = a0 + step
        
        # tooth tip
        points.append((cx + r_outer * math.cos(a0), cy + r_outer * math.sin(a0)))
        points.append((cx + r_outer * math.cos(a1), cy + r_outer * math.sin(a1)))
        # tooth root
        points.append((cx + r_inner * math.cos(a2), cy + r_inner * math.sin(a2)))
        points.append((cx + r_inner * math.cos(a3), cy + r_inner * math.sin(a3)))
    return points

# Render using PIL or pure python
from PIL import Image, ImageDraw, ImageFont, ImageFilter

font_path = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
try:
    font = ImageFont.truetype(font_path, 48)
except:
    font = ImageFont.load_default()

cx_left = WIDTH // 2 - 130
cx_right = WIDTH // 2 + 130
cy = HEIGHT // 2 - 35

for frame_idx in range(TOTAL_FRAMES):
    t = frame_idx / FPS
    # Create base dark image
    img = Image.new('RGB', (WIDTH, HEIGHT), (2, 4, 10))
    draw = ImageDraw.Draw(img)

    # Grid / Matrix background
    grid_spacing = 40
    for x in range(0, WIDTH, grid_spacing):
        draw.line([(x, 0), (x, HEIGHT)], fill=(6, 16, 36), width=1)
    for y in range(0, HEIGHT, grid_spacing):
        draw.line([(0, y), (WIDTH, y)], fill=(6, 16, 36), width=1)

    # Rotating Gears
    angle_left = t * 1.8 # radians
    angle_right = -t * 1.8

    # Left gear (cyan)
    pts_left = make_gear(cx_left, cy, 95, 78, 14, angle_left)
    draw.polygon(pts_left, outline=(30, 140, 255), fill=(8, 28, 64))
    draw.ellipse([cx_left - 72, cy - 72, cx_left + 72, cy + 72], outline=(30, 180, 255), width=2)
    draw.ellipse([cx_left - 30, cy - 30, cx_left + 30, cy + 30], outline=(30, 220, 255), fill=(4, 12, 30), width=3)
    # Spokes
    for s in range(6):
        sa = angle_left + s * (math.pi / 3)
        draw.line([(cx_left + 30 * math.cos(sa), cy + 30 * math.sin(sa)),
                   (cx_left + 72 * math.cos(sa), cy + 72 * math.sin(sa))],
                  fill=(30, 180, 255), width=2)

    # Right gear (magenta/purple)
    pts_right = make_gear(cx_right, cy, 95, 78, 14, angle_right)
    draw.polygon(pts_right, outline=(210, 80, 255), fill=(48, 14, 64))
    draw.ellipse([cx_right - 72, cy - 72, cx_right + 72, cy + 72], outline=(220, 100, 255), width=2)
    draw.ellipse([cx_right - 30, cy - 30, cx_right + 30, cy + 30], outline=(240, 140, 255), fill=(20, 6, 30), width=3)
    # Spokes
    for s in range(6):
        sa = angle_right + s * (math.pi / 3)
        draw.line([(cx_right + 30 * math.cos(sa), cy + 30 * math.sin(sa)),
                   (cx_right + 72 * math.cos(sa), cy + 72 * math.sin(sa))],
                  fill=(220, 100, 255), width=2)

    # Center interlocking gear
    pts_center = make_gear(WIDTH // 2, cy + 45, 38, 30, 10, -t * 3.6)
    draw.polygon(pts_center, outline=(100, 190, 255), fill=(10, 20, 45))
    draw.ellipse([WIDTH // 2 - 12, cy + 45 - 12, WIDTH // 2 + 12, cy + 45 + 12], outline=(180, 220, 255), width=2)

    # Infinity loop neon ribbon
    # Lemniscate of Bernoulli
    a = 210
    num_points = 240
    inf_points = []
    for i in range(num_points):
        theta = i * (2 * math.pi / num_points)
        denom = 1 + math.sin(theta)**2
        ix = WIDTH // 2 + (a * math.cos(theta)) / denom
        iy = cy + (a * math.sin(theta) * math.cos(theta)) / denom * 1.55
        inf_points.append((ix, iy))

    # Draw outer glow and core of infinity loop
    for i in range(len(inf_points)):
        p1 = inf_points[i]
        p2 = inf_points[(i + 1) % len(inf_points)]
        # Color gradient: Cyan on left, Purple on right
        progress = (p1[0] - (WIDTH // 2 - a)) / (2 * a)
        progress = max(0.0, min(1.0, progress))
        r = int(30 * (1 - progress) + 220 * progress)
        g = int(140 * (1 - progress) + 70 * progress)
        b = int(255 * (1 - progress) + 255 * progress)
        draw.line([p1, p2], fill=(r, g, b), width=7)

    # Animated energy pulse along infinity loop
    pulse_pos = (t * 1.2) % 1.0
    pulse_idx = int(pulse_pos * len(inf_points))
    for pk in range(-8, 9):
        idx = (pulse_idx + pk) % len(inf_points)
        px, py_val = inf_points[idx]
        intensity = max(0.0, 1.0 - abs(pk) / 8.0)
        p_r = min(255, int(255 * intensity))
        p_g = min(255, int(255 * intensity))
        p_b = 255
        radius = int(5 + 6 * intensity)
        draw.ellipse([px - radius, py_val - radius, px + radius, py_val + radius],
                     outline=(p_r, p_g, p_b), width=2)

    # "Jay DevWorks" Text
    text_str = "Jay DevWorks"
    bbox = draw.textbbox((0, 0), text_str, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    tx = (WIDTH - tw) // 2
    ty = HEIGHT // 2 + 115

    # Text glitch during first 1.5 seconds
    offset_x = 0
    if 0.8 < t < 1.3:
        offset_x = math.sin(t * 80) * 4

    # Text glow shadow
    draw.text((tx + offset_x, ty), text_str, font=font, fill=(30, 140, 255))
    draw.text((tx + offset_x, ty - 1), text_str, font=font, fill=(255, 255, 255))

    # Sweeping horizontal lens flare beam
    flare_progress = ((t - 1.0) % 3.5) / 3.5
    if 0 <= flare_progress <= 1.0:
        flare_x = int(-200 + flare_progress * (WIDTH + 400))
        flare_y = ty + th // 2
        # Draw horizontal light streak
        for f_offset in range(-60, 61, 3):
            alpha_factor = 1.0 - abs(f_offset) / 60.0
            beam_color = (int(80 * alpha_factor), int(190 * alpha_factor), int(255 * alpha_factor))
            draw.line([(flare_x - 180, flare_y + f_offset * 0.1), (flare_x + 180, flare_y + f_offset * 0.1)],
                      fill=beam_color, width=2)
        # Center hot star
        draw.ellipse([flare_x - 12, flare_y - 6, flare_x + 12, flare_y + 6], fill=(255, 255, 255))

    # Send raw RGB bytes to ffmpeg
    proc.stdin.write(img.tobytes())

proc.stdin.close()
proc.wait()
print("logo.mp4 successfully generated!")

# Also generate header logo (290x128 cropped tight)
header_cmd = [
    'ffmpeg', '-y',
    '-i', 'public/assets/vid/logo.mp4',
    '-vf', 'crop=in_w:in_w*(128/290):0:(in_h-in_w*(128/290))/2,scale=290:128',
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-preset', 'fast',
    '-crf', '20',
    'public/assets/vid/logo-header.mp4'
]
subprocess.run(header_cmd, check=True)
print("logo-header.mp4 successfully generated!")

# Also extract poster frames
subprocess.run(['ffmpeg', '-y', '-ss', '00:00:03.5', '-i', 'public/assets/vid/logo.mp4', '-vframes', '1', '-q:v', '2', 'public/assets/vid/logo-poster.jpg'], check=True)
subprocess.run(['ffmpeg', '-y', '-ss', '00:00:03.5', '-i', 'public/assets/vid/logo-header.mp4', '-vframes', '1', '-q:v', '2', 'public/assets/vid/logo-header-poster.jpg'], check=True)

# Copy to site and assets directories
subprocess.run(['cp', 'public/assets/vid/logo.mp4', 'public/assets/vid/logo-header.mp4', 'public/assets/vid/logo-poster.jpg', 'public/assets/vid/logo-header-poster.jpg', 'assets/vid/'], check=True)
subprocess.run(['cp', 'public/assets/vid/logo.mp4', 'public/assets/vid/logo-header.mp4', 'public/assets/vid/logo-poster.jpg', 'public/assets/vid/logo-header-poster.jpg', 'site/vid/'], check=True)
print("All animated logo assets created and synced successfully!")
