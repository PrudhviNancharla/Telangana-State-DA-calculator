@echo off
title Telangana 2 DAs Calculator - Local Web Server
echo ========================================================
echo Telangana 2 DAs Calculator - Local Web Server
echo Running at: http://localhost:5500/
echo ========================================================
echo.
start "" "http://localhost:5500/"
powershell -NoProfile -ExecutionPolicy Bypass -Command "$listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add('http://localhost:5500/'); $listener.Start(); Write-Host 'Local server started at http://localhost:5500/ (Press Ctrl+C to stop)'; while ($listener.IsListening) { $context = $listener.GetContext(); $request = $context.Request; $response = $context.Response; $path = $request.Url.LocalPath.TrimStart('/'); if ([string]::IsNullOrEmpty($path)) { $path = 'index.html' }; if (Test-Path $path) { $bytes = [System.IO.File]::ReadAllBytes($path); $ext = [System.IO.Path]::GetExtension($path).ToLower(); switch ($ext) { '.html' { $response.ContentType = 'text/html; charset=utf-8' } '.css' { $response.ContentType = 'text/css' } '.js' { $response.ContentType = 'application/javascript' } '.jpg' { $response.ContentType = 'image/jpeg' } '.png' { $response.ContentType = 'image/png' } default { $response.ContentType = 'application/octet-stream' } }; $response.OutputStream.Write($bytes, 0, $bytes.Length) } else { $response.StatusCode = 404 }; $response.Close() }"
