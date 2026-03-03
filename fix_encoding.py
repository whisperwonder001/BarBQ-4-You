file_path = r'c:\Users\Tec Sign\OneDrive\Desktop\BBQ 4 You\index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

try:
    # Attempt to reverse the CP1252 -> UTF-8 incorrect decoding
    restored_content = content.encode('cp1252').decode('utf-8')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(restored_content)
    print("Encoding successfully reversed!")
    
except Exception as e:
    print("Failed to reverse encoding directly:", e)
    
    # Try another approach if cp1252 fails (maybe it was cp1256? or something else)
    # Just printing the first 200 chars to see what it looks like before reversing
    print("Broken sample:", content[:200])
