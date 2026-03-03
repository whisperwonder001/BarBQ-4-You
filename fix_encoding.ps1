$path = "c:\Users\Tec Sign\OneDrive\Desktop\BBQ 4 You\index.html"
$content = Get-Content -Path $path -Raw -Encoding UTF8

# The content was read previously without an encoding (which means it used the default code page, typically Windows-1252 or Windows-1256 in Pakistan), 
# and then written out as UTF-8. 
# We need to reverse this process: 
# Get the "characters" of the corrupted string as bytes in the default encoding.
# Then interpret those bytes as UTF-8.

# Let's try ISO-8859-1 / Windows-1252 first
try {
    $enc1252 = [System.Text.Encoding]::GetEncoding(1252)
    $utf8 = [System.Text.Encoding]::UTF8
    
    $bytes = $enc1252.GetBytes($content)
    $restored = $utf8.GetString($bytes)
    
    Set-Content -Path $path -Value $restored -Encoding UTF8
    Write-Host "Reversed using 1252!"
} catch {
    Write-Host "Failed 1252."
}
