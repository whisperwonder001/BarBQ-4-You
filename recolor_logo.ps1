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
            # Analyze pixel color 
            # We want flames to be red/yellow. Let's find "orange/yellow" pixels and make them explicitly red/yellow.
            # And we want the dark lines (knife/fork) to be black for light theme, white for dark theme.
            
            $isOrangeYellow = ($pixel.R -gt 150 -and $pixel.R -gt $pixel.B * 1.5 -and ($pixel.G -gt 50))
            $isDarkLine = ($pixel.R -lt 160 -and $pixel.G -lt 160 -and $pixel.B -lt 160 -and -not $isOrangeYellow)
            
            if ($isOrangeYellow) {
                # Determine if it should lean towards Red or Yellow based on original G value or position
                # More green = more yellow, less green = more red
                if ($pixel.G -gt 130) {
                    # Make it bright yellow
                    $yellow = [System.Drawing.Color]::FromArgb($pixel.A, 255, 200, 0)
                    $light_bmp.SetPixel($x, $y, $yellow)
                    $dark_bmp.SetPixel($x, $y, $yellow)
                } else {
                    # Make it vivid red
                    $red = [System.Drawing.Color]::FromArgb($pixel.A, 255, 50, 0)
                    $light_bmp.SetPixel($x, $y, $red)
                    $dark_bmp.SetPixel($x, $y, $red)
                }
            } elseif ($isDarkLine) {
                # Knife and Fork lines
                # Light theme -> Black
                $black = [System.Drawing.Color]::FromArgb($pixel.A, 10, 10, 10)
                $light_bmp.SetPixel($x, $y, $black)
                
                # Dark theme -> White
                $white = [System.Drawing.Color]::FromArgb($pixel.A, 245, 245, 245)
                $dark_bmp.SetPixel($x, $y, $white)
            } else {
                # If neither, just copy it to both (acting as fallback edge blending)
                $light_bmp.SetPixel($x, $y, $pixel)
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

Write-Host "Colorized icons processed successfully!"
