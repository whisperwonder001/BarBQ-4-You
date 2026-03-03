import os
import re
import urllib.request
import ssl

print("Starting image localization...")

# Ignore SSL certificate errors just in case
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

# Provide a standard User-Agent header
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

base_dir = r'c:\Users\Tec Sign\OneDrive\Desktop\BBQ 4 You'
file_path = os.path.join(base_dir, 'index.html')
img_dir = os.path.join(base_dir, 'img')

# Ensure img directory exists
os.makedirs(img_dir, exist_ok=True)

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

def download_img(url, local_filename):
    local_path = os.path.join(img_dir, local_filename)
    if os.path.exists(local_path):
        print(f"Already exists: {local_filename}")
        return True
    
    print(f"Downloading {url} to {local_filename}")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ctx) as response, open(local_path, 'wb') as out_file:
            out_file.write(response.read())
        return os.path.getsize(local_path) > 0
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return False

# Extract all img tags
img_tags = re.findall(r'<img\s+[^>]+>', html)
print(f"Found {len(img_tags)} image tags to process.")

url_mapping = {}

# Process each tag
for tag in img_tags:
    src_match = re.search(r'src="([^"]+)"', tag)
    if not src_match:
        continue
    src = src_match.group(1)
    
    onerror_match = re.search(r'onerror="this\.src=\'([^\']+)\'"', tag)
    unsplash_fallback = onerror_match.group(1) if onerror_match else None
    
    needs_download = False
    download_url = None
    local_name = None
    
    # Determine if we need to download something
    if src.startswith('http'):
        # It's an external URL
        needs_download = True
        download_url = src
        # create a reliable filename
        m = re.search(r'photo-([a-zA-Z0-9\-]+)', src)
        if m:
            clean_id = m.group(1).split('?')[0]
            local_name = f"unsplash_{clean_id}.jpg"
        else:
            base = src.split('/')[-1].split('?')[0]
            local_name = f"ext_{base}"
            if not local_name.endswith('.jpg'):
                local_name += '.jpg'
    else:
        # It's a local path
        local_path = os.path.join(base_dir, src.replace('/', '\\'))
        if not os.path.exists(local_path) and unsplash_fallback:
            needs_download = True
            download_url = unsplash_fallback
            local_name = os.path.basename(src)
            
    new_tag = tag
    
    if needs_download and download_url and local_name:
        success = download_img(download_url, local_name)
        if success:
            new_src = f"img/{local_name}"
            # Replace src with local file
            new_tag = re.sub(r'src="[^"]+"', f'src="{new_src}"', new_tag)
            
    # Always strip onerror to clean up the HTML
    new_tag = re.sub(r'\s*onerror="[^"]+"', '', new_tag)
    
    # Replace the tag in HTML
    if new_tag != tag:
        html = html.replace(tag, new_tag)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("HTML modified successfully.")
