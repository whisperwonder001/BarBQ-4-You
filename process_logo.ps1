Add-Type -AssemblyName System.Drawing

$img_path = "C:\Users\Tec Sign\.gemini\antigravity\brain\eef16b37-b577-4d36-b206-356ac72fecf8\bbq_logo_icon_1772217074019.png"
$light_out = "c:\Users\Tec Sign\OneDrive\Desktop\BBQ 4 You\img\bbq-logo-light.png"
$dark_out = "c:\Users\Tec Sign\OneDrive\Desktop\BBQ 4 You\img\bbq-logo-dark.png"

$img = [System.Drawing.Image]::FromFile($img_path)
$bmp = New-Object System.Drawing.Bitmap($img)

# Crop the top portion where the icon is (roughly square)
$rect = New-Object System.Drawing.Rectangle(0, 0, $bmp.Width, [math]::Floor($bmp.Height * 0.55))
$cropped = $bmp.Clone($rect, $bmp.PixelFormat)

# Get the background color from top-left pixel
$bg_color = $cropped.GetPixel(0, 0)
$tolerance = 30

$light_bmp = New-Object System.Drawing.Bitmap($cropped.Width, $cropped.Height)
$dark_bmp = New-Object System.Drawing.Bitmap($cropped.Width, $cropped.Height)

for ($x = 0; $x -lt $cropped.Width; $x++) {
    for ($y = 0; $y -lt $cropped.Height; $y++) {
        $pixel = $cropped.GetPixel($x, $y)
        
        # Check if pixel is close to background color
        $diffR = [math]::Abs($pixel.R - $bg_color.R)
        $diffG = [math]::Abs($pixel.G - $bg_color.G)
        $diffB = [math]::Abs($pixel.B - $bg_color.B)
        
        if ($diffR -lt $tolerance -and $diffG -lt $tolerance -and $diffB -lt $tolerance) {
            # Make it transparent
            $transparent = [System.Drawing.Color]::FromArgb(0, 0, 0, 0)
            $light_bmp.SetPixel($x, $y, $transparent)
            $dark_bmp.SetPixel($x, $y, $transparent)
        } else {
            # Keep original for light mode
            $light_bmp.SetPixel($x, $y, $pixel)
            
            # Check if this is a dark line (the icon drawing) to turn white for dark mode
            if ($pixel.R -lt 150 -and $pixel.G -lt 150 -and $pixel.B -lt 150) {
                # Dark gray/brown lines -> Turn white
                $white = [System.Drawing.Color]::FromArgb($pixel.A, 255, 255, 255)
                $dark_bmp.SetPixel($x, $y, $white)
            } else {
                # Keep other colors (like the orange accent) for dark mode
                $dark_bmp.SetPixel($x, $y, $pixel)
            }
        }
    }
}

$light_bmp.Save($light_out, [System.Drawing.Imaging.ImageFormat]::Png)
$dark_bmp.Save($dark_out, [System.Drawing.Imaging.ImageFormat]::Png)

$img.Dispose()
$bmp.Dispose()
$cropped.Dispose()
$light_bmp.Dispose()
$dark_bmp.Dispose()

Write-Host "Processed images created."
