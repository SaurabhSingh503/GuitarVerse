import subprocess
import os
import textwrap
from PIL import Image, ImageDraw, ImageFont
from tts import generate_voice

VIDEO_DIR = "generated/videos"
IMAGE_DIR = "generated/images"
AUDIO_DIR = "generated/audio"

for d in [VIDEO_DIR, IMAGE_DIR, AUDIO_DIR]:
    os.makedirs(d, exist_ok=True)


def make_tab_image(song_title: str, artist: str, tabs: str, chords: list, bpm: int, song_id: int) -> str:
    """Creates a 1280x720 image showing the song info and tabs."""
    W, H = 1280, 720
    img = Image.new("RGB", (W, H), color=(5, 0, 15))
    draw = ImageDraw.Draw(img)

    # Use default PIL font — works on ALL systems without font files
    try:
        font_title  = ImageFont.load_default()
        font_body   = ImageFont.load_default()
        font_small  = ImageFont.load_default()
        font_tabs   = ImageFont.load_default()
    except:
        font_title = font_body = font_small = font_tabs = ImageFont.load_default()

    # Dark gradient background (draw rectangles for gradient effect)
    for i in range(H):
        ratio = i / H
        r = int(5  + ratio * 10)
        g = int(0  + ratio * 0)
        b = int(15 + ratio * 30)
        draw.line([(0, i), (W, i)], fill=(r, g, b))

    # Neon blue header bar
    draw.rectangle([(0, 0), (W, 90)], fill=(0, 20, 40))
    draw.rectangle([(0, 88), (W, 92)], fill=(0, 245, 255))

    # Title and artist
    draw.text((40, 18), f"GUITARPRO — AI TUTORIAL", fill=(0, 245, 255), font=font_title)
    draw.text((40, 48), f"{song_title}  by  {artist}", fill=(200, 200, 200), font=font_body)

    # BPM badge
    draw.rectangle([(W-180, 20), (W-20, 70)], fill=(0, 40, 60), outline=(0, 245, 255))
    draw.text((W-160, 30), f"BPM: {bpm}", fill=(0, 245, 255), font=font_body)

    # Chords section
    draw.text((40, 110), "CHORDS:", fill=(0, 245, 255), font=font_body)
    chord_str = "   ".join(chords)
    draw.text((140, 110), chord_str, fill=(255, 220, 100), font=font_body)

    # Tabs section
    draw.rectangle([(30, 150), (W-30, 500)], fill=(0, 0, 0, 180), outline=(0, 245, 255, 80))
    draw.text((50, 160), "GUITAR TABS:", fill=(0, 245, 255), font=font_body)

    # Draw each tab line
    tab_lines = tabs.split("\\n") if "\\n" in tabs else tabs.split("\n")
    y_pos = 195
    for line in tab_lines:
        draw.text((60, y_pos), line, fill=(0, 245, 255), font=font_tabs)
        y_pos += 42

    # Practice tip at bottom
    draw.rectangle([(0, H-100), (W, H)], fill=(0, 10, 20))
    draw.rectangle([(0, H-102), (W, H-100)], fill=(0, 245, 255))
    draw.text((40, H-80), f"💡 Start at {int(bpm*0.5)} BPM. Increase speed as you get comfortable.", fill=(150, 150, 150), font=font_small)
    draw.text((40, H-55), "GuitarPro AI — Your Personal Guitar Teacher", fill=(0, 245, 255), font=font_small)

    img_path = os.path.join(IMAGE_DIR, f"tutorial_{song_id}.png")
    img.save(img_path)
    return img_path


def generate_tutorial_video(song_id: int, song_title: str, artist: str,
                             tabs: str, chords: list, bpm: int) -> str:
    """Generates a tutorial video with voice narration + tab image using FFmpeg."""

    # 1. Generate voice narration
    script = (
        f"Welcome to GuitarPro. Today we will learn {song_title} by {artist}. "
        f"This song is played at {bpm} beats per minute. "
        f"The chords used are: {', '.join(chords)}. "
        f"Start slowly at {int(bpm * 0.5)} BPM. "
        f"Focus on clean chord transitions before increasing speed. "
        f"Practice for at least 15 minutes every day. Good luck!"
    )
    audio_path = generate_voice(script, lang="en", filename=f"tutorial_{song_id}")

    # 2. Generate tab image
    img_path = make_tab_image(song_title, artist, tabs, chords, bpm, song_id)

    # 3. Combine image + audio with FFmpeg
    output_path = os.path.join(VIDEO_DIR, f"tutorial_{song_id}.mp4")

    cmd = [
        "ffmpeg", "-y",
        "-loop", "1",           # loop the image
        "-i", img_path,         # input image
        "-i", audio_path,       # input audio
        "-c:v", "libx264",
        "-tune", "stillimage",
        "-c:a", "aac",
        "-b:a", "192k",
        "-pix_fmt", "yuv420p",
        "-shortest",            # stop when audio ends
        output_path
    ]

    result = subprocess.run(cmd, capture_output=True, text=True)

    if result.returncode != 0:
        raise RuntimeError(
            f"FFmpeg failed.\n"
            f"Make sure FFmpeg is installed.\n"
            f"Error: {result.stderr[-300:]}"
        )

    return output_path