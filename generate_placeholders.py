import os
from PIL import Image, ImageDraw, ImageFont
import random

# Create directory if it doesn't exist
os.makedirs('website/image', exist_ok=True)

# List of image files needed
image_files = [
    'profile.jpg',
    'grabnew.jpg',
    'fily.jpg',
    'photorhbumjpg.jpg',
    'gamelan.jpg',
    'srckkb.jpg',
    'photoumhackjpg.jpg',
    'Hackathon certificate GODAMLAH.png',
    'Hackathon certificate PLN2024.jpg',
    'cyberhero.jpg',
    'rahoma.jpg',
    'dapurpasak2.jpg'
]

# Function to generate a random color
def random_color():
    return (random.randint(100, 200), random.randint(100, 200), random.randint(100, 200))

# Create placeholder images
for img_file in image_files:
    # Determine file extension and create appropriate image
    if img_file.lower().endswith('.png'):
        img = Image.new('RGBA', (800, 600), (255, 255, 255, 0))
        # Add a colored rectangle
        overlay = Image.new('RGBA', (800, 600), (0, 0, 0, 0))
        draw = ImageDraw.Draw(overlay)
        draw.rectangle([(0, 0), (800, 600)], fill=(*random_color(), 180))
        img = Image.alpha_composite(img, overlay)
    else:
        img = Image.new('RGB', (800, 600), random_color())
    
    # Add text to the image
    draw = ImageDraw.Draw(img)
    
    # Try to use a font, fall back to default if not available
    try:
        font = ImageFont.truetype("DejaVuSans.ttf", 40)
    except IOError:
        font = ImageFont.load_default()
    
    # Get the name without extension for display
    img_name = os.path.splitext(img_file)[0]
    
    # Draw text
    draw.text((400, 300), img_name, fill=(255, 255, 255), font=font, anchor="mm")
    
    # Save the image
    img.save(f'website/image/{img_file}')
    print(f"Created placeholder for {img_file}")

print("All placeholder images have been created.")
