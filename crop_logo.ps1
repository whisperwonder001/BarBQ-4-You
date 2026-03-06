Add-Type -AssemblyName System.Drawing

$input_path = "c:\Users\Tec Sign\OneDrive\Desktop\BBQ 4 You\BarBQ-4-You\img\logo-white.png"
$output_path = "c:\Users\Tec Sign\OneDrive\Desktop\BBQ 4 You\BarBQ-4-You\img\logo-white-cropped.png"

$img = [System.Drawing.Image]::FromFile($input_path)
$bmp = New-Object System.Drawing.Bitmap($img)

$minX = $bmp.Width
$minY = $bmp.Height
$maxX = 0
$maxY = 0

for ($x = 0; $x -lt $bmp.Width; $x++) {
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        $pixel = $bmp.GetPixel($x, $y)
        if ($pixel.A -gt 0) {
            if ($x -lt $minX) { $minX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

if ($maxX -ge $minX -and $maxY -ge $minY) {
    $width = $maxX - $minX + 1
    $height = $maxY - $minY + 1
    
    # Add a small padding
    $padding = 10
    $minX = [math]::Max(0, $minX - $padding)
    $minY = [math]::Max(0, $minY - $padding)
    $width = [math]::Min($bmp.Width - $minX, $width + $padding * 2)
    $height = [math]::Min($bmp.Height - $minY, $height + $padding * 2)

    $rect = New-Object System.Drawing.Rectangle($minX, $minY, $width, $height)
    $cropped = $bmp.Clone($rect, $bmp.PixelFormat)
    $cropped.Save($output_path, [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    Write-Host "Cropped logo saved to $output_path (Size: $width x $height)"
} else {
    Write-Host "No visible content found in logo."
}

$img.Dispose()
$bmp.Dispose()
