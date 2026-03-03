$htmlPath = "c:\Users\Tec Sign\OneDrive\Desktop\BBQ 4 You\index.html"
$imgDir = "c:\Users\Tec Sign\OneDrive\Desktop\BBQ 4 You\img"
$htmlContent = Get-Content -Path $htmlPath -Raw

$images = @{
    "img/about-food.jpg" = "https://images.unsplash.com/photo-1544025162-83601bc72afb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    "img/frozen-seekh.jpg" = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    "img/frozen-shami.jpg" = "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    "img/frozen-samosa.jpg" = "https://images.unsplash.com/photo-1601050690597-df0568a70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    "img/frozen-rolls.jpg" = "https://images.unsplash.com/photo-1585238341258-fc29b71f985c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    "img/biryani.jpg" = "https://images.unsplash.com/photo-1633383718081-22ac93e3db65?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    "img/karahi.jpg" = "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    "img/qorma.jpg" = "https://images.unsplash.com/photo-1518492104633-130d0cc84637?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    "img/naan-roti.jpg" = "https://images.unsplash.com/photo-1565557623262-b51f2510b641?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    "img/salads.jpg" = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    "img/drinks.jpg" = "https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    "img/paratha.jpg" = "https://images.unsplash.com/photo-1606491956391-70868b5d0f47?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    "img/tikka-boti.jpg" = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
}

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

foreach ($key in $images.Keys) {
    $url = $images[$key]
    $dest = Join-Path "c:\Users\Tec Sign\OneDrive\Desktop\BBQ 4 You" $key
    if (-not (Test-Path $dest) -or (Get-Item $dest).length -eq 0) {
        Write-Host "Downloading $key"
        try {
            Invoke-WebRequest -Uri $url -OutFile $dest -ErrorAction Stop
        } catch {
            Write-Host "Failed to download $key, using fallback..."
            Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" -OutFile $dest
        }
    }
}

$htmlContent = $htmlContent -replace 'src="https://images\.unsplash\.com/photo-1633383718081-22ac93e3db65\?[^"]*"', 'src="img/biryani.jpg"'
$htmlContent = $htmlContent -replace 'src="https://images\.unsplash\.com/photo-1544928147-79a2dbc1f389\?[^"]*"', 'src="img/karahi.jpg"'
$htmlContent = $htmlContent -replace 'src="https://images\.unsplash\.com/photo-1518492104633-130d0cc84637\?[^"]*"', 'src="img/qorma.jpg"'
$htmlContent = $htmlContent -replace 'src="https://images\.unsplash\.com/photo-1565557623262-b51f2510b641\?[^"]*"', 'src="img/naan-roti.jpg"'
$htmlContent = $htmlContent -replace 'src="https://images\.unsplash\.com/photo-1512621776951-a57141f2eefd\?[^"]*"', 'src="img/salads.jpg"'
$htmlContent = $htmlContent -replace 'src="https://images\.unsplash\.com/photo-1576092768241-dec231879fc3\?[^"]*"', 'src="img/drinks.jpg"'
$htmlContent = $htmlContent -replace 'src="https://images\.unsplash\.com/photo-1601050690597-df0568a70950\?[^"]*"', 'src="img/frozen-samosa.jpg"'
$htmlContent = $htmlContent -replace 'src="https://images\.unsplash\.com/photo-1606491956391-70868b5d0f47\?[^"]*"', 'src="img/paratha.jpg"'
$htmlContent = $htmlContent -replace 'src="https://images\.unsplash\.com/photo-1599487405270-86430af532b2\?[^"]*"', 'src="img/tikka-boti.jpg"'

# Remove onerror attributes
$htmlContent = $htmlContent -replace '\s*onerror="this\.src=''[^'']+''"', ''

Set-Content -Path $htmlPath -Value $htmlContent -Encoding UTF8
Write-Host "HTML updated safely."
