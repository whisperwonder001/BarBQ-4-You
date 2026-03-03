import cv2
import numpy as np

img_path = r'C:\Users\Tec Sign\.gemini\antigravity\brain\eef16b37-b577-4d36-b206-356ac72fecf8\bbq_logo_icon_1772217074019.png'
img = cv2.imread(img_path)

if img is None:
    print("Could not read image")
    exit(1)

# we only need the top circular part of the image, where the icon is
# let's crop it to the top square
h, w = img.shape[:2]
# assuming the icon is roughly square and at the top
cut_idx = int(h * 0.6) 
icon_only = img[0:cut_idx, :]

# let's also remove the background and make it transparent
# typically the easiest way is to find the background color (top-left pixel) and make it transparent
bg_color = icon_only[0, 0]

# Add alpha channel
rgba = cv2.cvtColor(icon_only, cv2.COLOR_BGR2BGRA)

# create a mask where background matches
diff = np.abs(icon_only.astype(int) - bg_color.astype(int))
mask = np.sum(diff, axis=2) < 30 # tolerance

rgba[mask, 3] = 0

# save light theme version 
light_out = r'c:\Users\Tec Sign\OneDrive\Desktop\BBQ 4 You\img\bbq-logo-light.png'
cv2.imwrite(light_out, rgba)

# create dark theme version - maybe invert colors or change dark gray to white
# to change dark grey lines to white:
hsv = cv2.cvtColor(icon_only, cv2.COLOR_BGR2HSV)
# find dark pixels
dark_mask = hsv[:, :, 2] < 100 

rgba_dark = rgba.copy()
# turn dark pixels white
rgba_dark[dark_mask, 0] = 255
rgba_dark[dark_mask, 1] = 255
rgba_dark[dark_mask, 2] = 255

dark_out = r'c:\Users\Tec Sign\OneDrive\Desktop\BBQ 4 You\img\bbq-logo-dark.png'
cv2.imwrite(dark_out, rgba_dark)

print("Icons saved successfully")
