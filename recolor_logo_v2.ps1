Add-Type -AssemblyName System.Drawing

$input_path = "c:\Users\Tec Sign\OneDrive\Desktop\BBQ 4 You\BarBQ-4-You\img\logo-white.png"
$output_path = "c:\Users\Tec Sign\OneDrive\Desktop\BBQ 4 You\BarBQ-4-You\img\logo-dark.png"

$img = [System.Drawing.Image]::FromFile($input_path)
$bmp = New-Object System.Drawing.Bitmap($img)

$new_bmp = New-Object System.Drawing.Bitmap($bmp.Width, $bmp.Height)

for ($x = 0; $x -lt $bmp.Width; $x++) {
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        $pixel = $bmp.GetPixel($x, $y)
        
        # If pixel is white or close to white, change to dark blue (#0f172a)
        if ($pixel.R -gt 200 -and $pixel.G -gt 200 -and $pixel.B -gt 200) {
            $dark_color = [System.Drawing.Color]::FromArgb($pixel.A, 15, 23, 42)
            $new_bmp.SetPixel($x, $y, $dark_color)
        } else {
            $new_bmp.SetPixel($x, $y, $pixel)
        }
    }
}

$new_bmp.Save($output_path, [System.Drawing.Imaging.ImageFormat]::Png)

$img.Dispose()
$bmp.Dispose()
$new_bmp.Dispose()

Write-Host "Recolored logo saved to $output_path"
