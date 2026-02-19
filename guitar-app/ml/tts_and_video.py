# =============================================================================
# ml/tts.py — Text-to-Speech using gTTS
# =============================================================================
from gtts import gTTS
import os

OUTPUT_DIR = "generated/audio"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def generate_voice(text: str, lang: str = "en", filename: str = "output") -> str:
    """
    Generate voice audio from text using Google Text-to-Speech.
    Returns filepath of generated MP3.
    """
    tts = gTTS(text=text, lang=lang, slow=False)
    filepath = os.path.join(OUTPUT_DIR, f"{filename}.mp3")
    tts.save(filepath)
    return filepath

def generate_tutorial_audio(song_title: str, artist: str, chords: list, bpm: int) -> str:
    """
    Generate a complete tutorial voiceover script and audio.
    """
    script = f"""
    Welcome to the GuitarPro tutorial for {song_title} by {artist}.
    This song uses {len(chords)} main chords: {', '.join(chords)}.
    The tempo is {bpm} beats per minute.
    Let's start by learning the chord shapes.
    First, place your fingers for the {chords[0]} chord.
    Take your time and make sure every string rings clearly.
    Now let's practice the strumming pattern slowly.
    Ready? Let's play!
    """
    return generate_voice(script.strip(), lang="en", filename=f"tutorial_{song_title.replace(' ', '_').lower()}")


# =============================================================================
# ml/video_gen.py — Tutorial Video Generation with FFmpeg
# =============================================================================
import subprocess
import os
from PIL import Image, ImageDraw, ImageFont
import textwrap

VIDEO_DIR = "generated/videos"
os.makedirs(VIDEO_DIR, exist_ok=True)

def create_tab_image(song_title: str, artist: str, tabs: str, chords: list, bpm: int) -> str:
    """
    Creates a stylized tab image using Pillow.
    """
    width, height = 1280, 720
    img = Image.new('RGB', (width, height), color=(10, 0, 20))
    draw = ImageDraw.Draw(img)
    
    # Background gradient effect (simplified)
    for y in range(height):
        r = int(10 + y/height * 20)
        g = int(0)
        b = int(20 + y/height * 40)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    # Title
    try:
        font_large = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 48)
        font_medium = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 28)
        font_mono = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf", 22)
    except:
        font_large = font_medium = font_mono = ImageFont.load_default()
    
    # Song title
    draw.text((60, 50), song_title, fill=(0, 245, 255), font=font_large)
    draw.text((60, 110), f"by {artist}  •  {bpm} BPM", fill=(150, 150, 180), font=font_medium)
    
    # Chords section
    draw.text((60, 165), "Chords: " + "  ".join(chords), fill=(200, 200, 255), font=font_medium)
    
    # Tab display
    draw.text((60, 220), "Guitar Tab:", fill=(0, 200, 200), font=font_medium)
    y_pos = 260
    for line in tabs.split('\n'):
        draw.text((60, y_pos), line, fill=(200, 255, 200), font=font_mono)
        y_pos += 32
    
    # Footer
    draw.text((60, 650), "GuitarPro — AI Guitar Learning Platform 🎸", fill=(80, 80, 100), font=font_medium)
    
    img_path = os.path.join(VIDEO_DIR, f"{song_title.replace(' ', '_')}_tab.png")
    img.save(img_path)
    return img_path

def generate_tutorial_video(song_id: int, song_title: str, artist: str, tabs: str, chords: list, bpm: int) -> str:
    """
    Generates a tutorial video by combining:
    1. Tab image (Pillow)
    2. Voice narration (gTTS)
    3. Merge with FFmpeg
    """
    # Step 1: Generate tab image
    img_path = create_tab_image(song_title, artist, tabs, chords, bpm)
    
    # Step 2: Generate voice
    audio_path = generate_tutorial_audio(song_title, artist, chords, bpm)
    
    # Step 3: Combine with FFmpeg
    output_path = os.path.join(VIDEO_DIR, f"tutorial_{song_id}.mp4")
    
    cmd = [
        "ffmpeg", "-y",
        "-loop", "1",                         # Loop image as video
        "-i", img_path,                        # Input image
        "-i", audio_path,                      # Input audio
        "-c:v", "libx264",                     # Video codec
        "-tune", "stillimage",                 # Optimize for still image
        "-c:a", "aac",                         # Audio codec
        "-b:a", "192k",                        # Audio bitrate
        "-pix_fmt", "yuv420p",                 # Pixel format for compatibility
        "-shortest",                           # End when audio ends
        "-vf", "scale=1280:720",               # Force 720p
        output_path
    ]
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    if result.returncode != 0:
        raise RuntimeError(f"FFmpeg failed: {result.stderr}")
    
    return output_path


# =============================================================================
# ml/requirements.txt — Python dependencies
# =============================================================================
REQUIREMENTS = """
fastapi==0.109.0
uvicorn[standard]==0.27.0
pydantic==2.5.3
numpy==1.26.3
scikit-learn==1.4.0
gTTS==2.5.0
Pillow==10.2.0
requests==2.31.0
python-multipart==0.0.7
"""

if __name__ == "__main__":
    # Write requirements.txt
    with open("requirements.txt", "w") as f:
        f.write(REQUIREMENTS.strip())
    print("✅ requirements.txt written")
