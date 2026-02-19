from gtts import gTTS
import os

OUTPUT_DIR = "generated/audio"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def generate_voice(text: str, lang: str = "en", filename: str = "output") -> str:
    filepath = os.path.join(OUTPUT_DIR, f"{filename}.mp3")
    tts = gTTS(text=text, lang=lang, slow=False)
    tts.save(filepath)
    return filepath