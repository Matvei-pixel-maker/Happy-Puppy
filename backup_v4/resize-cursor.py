from PIL import Image

src = Image.open('public/cursor-logo.png').convert('RGBA')
src.resize((24, 24), Image.LANCZOS).save('public/cursor-logo.png')
src.resize((256, 256), Image.LANCZOS).save('cursor-preview.png')
print('cursor-logo.png resized to 24x24')
