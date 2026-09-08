$root = (Get-Location).Path
$renamed = 0
$skipped = 0
$failed = 0

Write-Host "Scanning for .psd files under: $root"

try {
    $files = Get-ChildItem -LiteralPath $root -File -Recurse -ErrorAction Stop |
        Where-Object { $_.Extension -ieq '.psd' }
}
catch {
    Write-Error "Could not scan '$root': $($_.Exception.Message)"
    exit 1
}

foreach ($file in $files) {
    $newName = [System.IO.Path]::ChangeExtension($file.Name, '.pst')
    $destination = Join-Path -Path $file.DirectoryName -ChildPath $newName

    if (Test-Path -LiteralPath $destination -PathType Leaf) {
        Write-Warning "Skipped (destination already exists): $($file.FullName)"
        $skipped++
        continue
    }

    try {
        Rename-Item -LiteralPath $file.FullName -NewName $newName -ErrorAction Stop
        Write-Host "Renamed: $($file.FullName) -> $destination"
        $renamed++
    }
    catch {
        Write-Warning "Failed (possibly locked or inaccessible): $($file.FullName)"
        Write-Warning "Reason: $($_.Exception.Message)"
        $failed++
    }
}

Write-Host "Finished. Renamed: $renamed; skipped: $skipped; failed: $failed."