# Component Portfolio File Flattening Script
# Copies all relevant source files to a flat directory for AI evaluation
# Adds "CP-" prefix to all files for easy identification

[CmdletBinding()]
# Get the directory where this script is located (Component Portfolio root)
$SourcePath = if ($PSScriptRoot) {
    $PSScriptRoot
}
else {
    Split-Path -Parent $MyInvocation.MyCommand.Path
}

# Project prefix for all copied files
$ProjectPrefix = "CP-"

# Always use the specified destination folder, with a timestamped subfolder
$BaseDestination = "C:\Users\Robert Cushman\.vscode\Projects\copied-files"
$Timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$DestinationPath = Join-Path $BaseDestination "component-portfolio-$Timestamp"

# Folders to exclude (not relevant for AI evaluation)
$ExcludeFolders = @(
    'node_modules',
    'dist',
    'build',
    '.git',
    '.vscode',
    'public',
    'copied-files'
)

# File extensions to include (relevant for AI)
$IncludeExtensions = @(
    '.js',
    '.jsx',
    '.ts',
    '.tsx',
    '.html',
    '.css',
    '.json',
    '.md',
    '.txt',
    'package.json',
    'vite.config.js',
    'tailwind.config.js',
    'postcss.config.js',
    '.gitignore',
    '.eslintrc'
)

# File extensions to explicitly exclude (binary/media files)
$ExcludeExtensions = @(
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.webp',
    '.svg',
    '.ico',
    '.mp4',
    '.mp3',
    '.wav',
    '.exe',
    '.dll',
    '.zip',
    '.pdf',
    '.log',
    '.lock'
)

# Initialize counters
$CopiedCount = 0
$ErrorCount = 0
$StartTime = Get-Date

Write-Host "Starting Component Portfolio File Flattening for AI Evaluation" -ForegroundColor Magenta
Write-Host "Project Prefix: $ProjectPrefix" -ForegroundColor Yellow
Write-Host "Source: $SourcePath" -ForegroundColor Cyan
Write-Host "Destination: $DestinationPath" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor DarkGray

try {
    # Validate source path
    if (-not (Test-Path $SourcePath)) { 
        throw "Source path does not exist: $SourcePath" 
    }
    
    # Create destination directory (clean slate)
    if (Test-Path $DestinationPath) { 
        Remove-Item -Path $DestinationPath -Recurse -Force -ErrorAction SilentlyContinue 
    }
    New-Item -Path $DestinationPath -ItemType Directory -Force | Out-Null
    
    Write-Host "Scanning for relevant files..." -ForegroundColor Yellow
    
    # Get all files recursively
    $AllFiles = Get-ChildItem -Path $SourcePath -Recurse -File -Force -ErrorAction SilentlyContinue
    $FilesToCopy = @()
    
    foreach ($file in $AllFiles) {
        $shouldExclude = $false
        
        # Check if file extension is explicitly excluded
        if ($ExcludeExtensions -contains $file.Extension.ToLower()) { 
            $shouldExclude = $true 
        }
        
        # Check if file should be included
        if (-not $shouldExclude) {
            $fileNameLower = $file.Name.ToLower()
            $fileExtLower = $file.Extension.ToLower()
            
            # Check for important files without extensions or specific names
            $isImportantNoExt = $IncludeExtensions | Where-Object { $fileNameLower -eq $_ }
            
            if (-not ($IncludeExtensions -contains $fileExtLower -or $isImportantNoExt)) { 
                $shouldExclude = $true 
            }
        }
        
        # Check if file is in an excluded folder
        if (-not $shouldExclude) {
            $relativePath = $file.FullName.Substring($SourcePath.Length + 1)
            foreach ($folder in $ExcludeFolders) {
                if ($relativePath -like "$folder\*" -or $relativePath -like "$folder/*") { 
                    $shouldExclude = $true
                    break 
                }
            }
        }
        
        if (-not $shouldExclude) { 
            $FilesToCopy += $file 
        }
    }

    $totalFiles = $FilesToCopy.Count
    Write-Host "Selected $totalFiles files for copying" -ForegroundColor Green
    if ($totalFiles -eq 0) { Write-Warning "No files found to copy."; return }

    # ============================================================================
    # Component Portfolio Smart Renaming with CP- Prefix
    # ============================================================================
    Write-Host "Copying files with CP- prefix and smart renaming..." -ForegroundColor Yellow
    $nameTracker = @{}
    
    # Generic filenames that need parent folder context
    $genericFileNames = @(
        'index.jsx',
        'index.js',
        'index.ts',
        'index.tsx',
        'App.jsx',
        'App.js',
        'main.jsx',
        'main.js'
    )

    foreach ($file in $FilesToCopy) {
        try {
            $originalName = $file.Name
            $baseName = $originalName
            
            # Get relative path from source for context
            $relativePath = $file.FullName.Substring($SourcePath.Length + 1)
            $pathParts = $relativePath.Split([IO.Path]::DirectorySeparatorChar)

            # Check if the filename is generic and needs folder context
            if ($genericFileNames -contains $originalName.ToLower()) {
                $parentName = $file.Directory.Name
                # Only prepend if it's not in the root directory
                if ($file.DirectoryName -ne $SourcePath) {
                    $baseName = "$parentName-$originalName"
                }
            }
            
            # Add CP- prefix to the filename
            $finalName = "$ProjectPrefix$baseName"
            
            # Handle duplicates with a counter
            if ($nameTracker.ContainsKey($finalName.ToLower())) {
                $nameTracker[$finalName.ToLower()]++
                $counter = $nameTracker[$finalName.ToLower()]
                $nameNoExt = [System.IO.Path]::GetFileNameWithoutExtension($finalName)
                $extension = [System.IO.Path]::GetExtension($finalName)
                $finalName = "$nameNoExt`_$counter$extension"
            }
            else {
                $nameTracker[$finalName.ToLower()] = 1
            }

            $targetFile = Join-Path $DestinationPath $finalName

            # Copy file
            Copy-Item -Path $file.FullName -Destination $targetFile -Force
            $CopiedCount++

            # Progress reporting
            if ($CopiedCount % 10 -eq 0 -or $CopiedCount -eq $totalFiles) {
                $percent = [Math]::Round(($CopiedCount / $totalFiles) * 100, 1)
                Write-Host "Progress: $CopiedCount/$totalFiles files ($percent%)" -ForegroundColor Cyan
            }
        }
        catch {
            $ErrorCount++
            Write-Warning "Failed to copy '$($file.Name)': $($_.Exception.Message)"
        }
    }
    # ============================================================================
    
    # Final Report
    $endTime = Get-Date
    $duration = $endTime - $StartTime
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor DarkGray
    Write-Host "Component Portfolio File Flattening Complete!" -ForegroundColor Green
    Write-Host "Successfully copied: $CopiedCount files (with CP- prefix)" -ForegroundColor Green
    Write-Host "Skipped (excluded): $($AllFiles.Count - $totalFiles) files" -ForegroundColor Yellow
    if ($ErrorCount -gt 0) { 
        Write-Host "Errors encountered: $ErrorCount files" -ForegroundColor Red 
    }
    Write-Host "Total duration: $($duration.TotalSeconds.ToString('F2')) seconds" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Destination folder:" -ForegroundColor White
    Write-Host "  $DestinationPath" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "All files are prefixed with: $ProjectPrefix" -ForegroundColor Yellow
    Write-Host "============================================================" -ForegroundColor DarkGray
    
    if ($ErrorCount -gt 0) { 
        Write-Host "Operation completed with errors." -ForegroundColor Yellow 
    }
    else { 
        Write-Host "✓ Ready for AI evaluation!" -ForegroundColor Green 
    }
}
catch {
    Write-Error "Fatal error: $($_.Exception.Message)"
    Write-Host "Stack trace: $($_.ScriptStackTrace)" -ForegroundColor Red
}

Write-Host ""
Write-Host "Script execution completed." -ForegroundColor Green