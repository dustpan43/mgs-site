$port = if ($env:PORT) { $env:PORT } else { "3000" }
$root = "C:\Users\dusti\OneDrive\Desktop\mgs-site"
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
[Console]::Out.WriteLine("Server running on port $port")
[Console]::Out.Flush()
$mime = @{
    '.html' = 'text/html'; '.css' = 'text/css'; '.js' = 'application/javascript'
    '.json' = 'application/json'; '.svg' = 'image/svg+xml'; '.png' = 'image/png'
    '.jpg' = 'image/jpeg'; '.jpeg' = 'image/jpeg'; '.gif' = 'image/gif'
    '.ico' = 'image/x-icon'; '.webp' = 'image/webp'; '.woff2' = 'font/woff2'
}
while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $path = $ctx.Request.Url.LocalPath
    if ($path -eq '/') { $path = '/index.html' }
    if (-not [System.IO.Path]::HasExtension($path)) { $path = "$path/index.html" }
    $file = Join-Path $root $path.TrimStart('/')
    if (Test-Path $file) {
        $ext = [System.IO.Path]::GetExtension($file)
        $ct = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' }
        $bytes = [System.IO.File]::ReadAllBytes($file)
        $ctx.Response.ContentType = "$ct; charset=utf-8"
        $ctx.Response.ContentLength64 = $bytes.Length
        $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $ctx.Response.StatusCode = 404
        $msg = [System.Text.Encoding]::UTF8.GetBytes("Not found: $path")
        $ctx.Response.OutputStream.Write($msg, 0, $msg.Length)
    }
    $ctx.Response.Close()
}
