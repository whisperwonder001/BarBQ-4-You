from PIL import Image

def crop_to_content(image_path, output_path):
    img = Image.open(image_path).convert("RGBA")
    
    # Get the bounding box of the non-transparent area
    bbox = img.getbbox()
    
    if bbox:
        # Crop to the bounding box
        img_cropped = img.crop(bbox)
        
        # Optionally add a tiny bit of padding
        padding = 10
        width, height = img_cropped.size
        new_img = Image.new("RGBA", (width + padding*2, height + padding*2), (0, 0, 0, 0))
        new_img.paste(img_cropped, (padding, padding))
        
        new_img.save(output_path)
        print(f"Cropped logo saved to {output_path}")
    else:
        print("No content found in image.")

if __name__ == "__main__":
    crop_to_content("img/logo-white.png", "img/logo-white-cropped.png")
