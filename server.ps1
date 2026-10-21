param(
    [int]$port = 5500,
    [string]$dir = "C:\Users\Admin\.gemini\antigravity\scratch\Telangana-State-DA-calculator"
)

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://127.0.0.1:$port/")
$listener.Start()

Write-Host "=========================================================="
Write-Host "Telangana 2 DAs Calculator Server running at:"
Write-Host "http://localhost:$port/"
Write-Host "=========================================================="

while ($listener.IsListening) {
    $res = $null
    try {
        $context = $listener.GetContext()
        $req = $context.Request
        $res = $context.Response
        $rawPath = $req.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($rawPath)) {
            $rawPath = "index.html"
        }
        $fileName = [System.IO.Path]::GetFileName($rawPath)
        $filePath = Join-Path $dir $fileName

        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            switch ($ext) {
                ".html" { $res.ContentType = "text/html; charset=utf-8" }
                ".css"  { $res.ContentType = "text/css; charset=utf-8" }
                ".js"   { $res.ContentType = "application/javascript; charset=utf-8" }
                ".json" { $res.ContentType = "application/json; charset=utf-8" }
                ".jpg"  { $res.ContentType = "image/jpeg" }
                ".jpeg" { $res.ContentType = "image/jpeg" }
                ".png"  { $res.ContentType = "image/png" }
                ".svg"  { $res.ContentType = "image/svg+xml" }
                ".ico"  { $res.ContentType = "image/x-icon" }
                default { $res.ContentType = "application/octet-stream" }
            }
            $res.AddHeader("Access-Control-Allow-Origin", "*")
            $res.ContentLength64 = $bytes.Length
            if ($req.HttpMethod -ne "HEAD") {
                $res.OutputStream.Write($bytes, 0, $bytes.Length)
            }
            $res.StatusCode = 200
        } else {
            $res.StatusCode = 404
            $res.ContentLength64 = 0
        }
    } catch {
        # ignore context errors
    } finally {
        if ($null -ne $res) {
            try { $res.Close() } catch {}
        }
    }
}
