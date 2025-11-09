# Component Portfolio - Project Structure Generator for AI Analysis
# Generates a filtered project structure showing only AI-relevant files
# Customized for Component Portfolio project

[CmdletBinding()]
param(
    [Parameter(Mandatory = $false)]
    [string]$ProjectPath,

    [Parameter(Mandatory = $false)]
    [int]$MaxDepth = 5
)

# Get the directory where this script is located (Component Portfolio root)
if (-not $ProjectPath) {
    $ProjectPath = if ($PSScriptRoot) {
        $PSScriptRoot
    }
    else {
        Split-Path -Parent $MyInvocation.MyCommand.Path
    }
}

# Project prefix
$ProjectPrefix = "CP"

# Always use the specified output folder (same as flatten-files.ps1)
$OutputFolder = "C:\Users\Robert Cushman\.vscode\Projects\copied-files"

# List of folders to EXCLUDE from structure (Component Portfolio specific)
$ExcludeFolders = @(
    'node_modules',
    'dist',
    'build',
    '.git',
    '.vscode',
    'public',
    'copied-files'
)

# File extensions to INCLUDE (Component Portfolio relevant files)
$IncludeExtensions = @(
    # Source code files
    '.js',
    '.jsx',
    '.ts',
    '.tsx',
    '.html',
    '.css',

    # Configuration files
    '.json',
    '.md',
    '.txt',

    # Build and project files
    '.gitignore',
    '.eslintrc',
    '.prettierrc'
)

# File extensions to EXCLUDE
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
    '.lock',
    '.ps1'
)

# Important files without extensions (Component Portfolio specific)
$ImportantFiles = @('package.json', 'vite.config.js', 'tailwind.config.js', 'postcss.config.js', 'readme', 'license')

# Function to check if a file should be included
function Test-ShouldIncludeFile {
    param([System.IO.FileInfo]$File)

    # Check if file extension should be excluded
    if ($ExcludeExtensions -contains $File.Extension.ToLower()) {
        return $false
    }

    $fileName = $File.Name.ToLower()
    $fileExt = $File.Extension.ToLower()

    # Check if it's an important file without extension
    $isImportant = $false
    foreach ($important in $ImportantFiles) {
        if ($fileName -like "*$important*") {
            $isImportant = $true
            break
        }
    }

    # Include if extension is in include list OR it's an important file
    return ($IncludeExtensions -contains $fileExt -or $isImportant)
}

# Function to check if a folder should be excluded
function Test-ShouldExcludeFolder {
    param([string]$FolderName)

    foreach ($folder in $ExcludeFolders) {
        if ($FolderName -like "*$folder*") {
            return $true
        }
    }
    return $false
}

# Function to write project structure recursively
function Write-ProjectStructure {
    param (
        [string]$Path,
        [int]$Level = 0,
        [System.IO.StreamWriter]$Writer,
        [int]$MaxDepth = 5
    )

    # Stop if we've reached max depth
    if ($Level -gt $MaxDepth) {
        return
    }

    # Create indentation using spaces to avoid encoding issues
    $Prefix = '    ' * $Level

    try {
        # ✅ FIX: Use -LiteralPath to handle special characters like [ and ]
        $Items = Get-ChildItem -LiteralPath $Path -ErrorAction SilentlyContinue | Sort-Object { -not $_.PSIsContainer }, Name
    }
    catch {
        return
    }

    # Filter items
    $FilteredItems = @()
    foreach ($Item in $Items) {
        if ($Item.PSIsContainer) {
            # Include folder if not in exclude list
            if (-not (Test-ShouldExcludeFolder -FolderName $Item.Name)) {
                $FilteredItems += $Item
            }
        }
        else {
            # Include file if it matches our criteria
            if (Test-ShouldIncludeFile -File $Item) {
                $FilteredItems += $Item
            }
        }
    }

    $itemCount = $FilteredItems.Count
    for ($i = 0; $i -lt $itemCount; $i++) {
        $Item = $FilteredItems[$i]
        $IsLast = ($i -eq ($itemCount - 1))

        # Use simple ASCII characters for tree structure
        if ($IsLast) {
            $LinePrefix = $Prefix + '+-- '
        }
        else {
            $LinePrefix = $Prefix + '|-- '
        }

        if ($Item.PSIsContainer) {
            $Writer.WriteLine("$LinePrefix$($Item.Name)/")
            Write-ProjectStructure -Path $Item.FullName -Level ($Level + 1) -Writer $Writer -MaxDepth $MaxDepth
        }
        else {
            $Writer.WriteLine("$LinePrefix$($Item.Name)")
        }
    }
}

# Main execution
Write-Host "Component Portfolio - Generating Project Structure for AI Analysis" -ForegroundColor Magenta
Write-Host "Project Prefix: $ProjectPrefix" -ForegroundColor Yellow
Write-Host "Project: $ProjectPath" -ForegroundColor Cyan
Write-Host "Output: $OutputFolder" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor DarkGray

try {
    # Validate project path
    if (-not (Test-Path $ProjectPath)) {
        throw "Project path does not exist: $ProjectPath"
    }

    # Create output folder if it doesn't exist
    if (-not (Test-Path $OutputFolder)) {
        Write-Host "Creating output folder..." -ForegroundColor Yellow
        New-Item -Path $OutputFolder -ItemType Directory -Force | Out-Null
    }

    # Generate filename with CP prefix and timestamp
    $Timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
    $FileName = "$ProjectPrefix-project-structure-$Timestamp.txt"
    $ReportPath = Join-Path $OutputFolder $FileName

    Write-Host "Analyzing project structure..." -ForegroundColor Yellow

    # Count files for summary
    # ✅ FIX: Use -LiteralPath here as well for consistency and safety
    $AllFiles = Get-ChildItem -LiteralPath $ProjectPath -Recurse -File -Force -ErrorAction SilentlyContinue
    $RelevantFiles = 0
    foreach ($file in $AllFiles) {
        $relativePath = $file.FullName.Substring($ProjectPath.Length + 1)
        $inExcludedFolder = $false
        foreach ($folder in $ExcludeFolders) {
            if ($relativePath -like "*$folder*") {
                $inExcludedFolder = $true
                break
            }
        }

        if (-not $inExcludedFolder -and (Test-ShouldIncludeFile -File $file)) {
            $RelevantFiles++
        }
    }

    # Create the structure file
    Write-Host "Writing structure file..." -ForegroundColor Yellow
    $Writer = New-Object System.IO.StreamWriter($ReportPath, $false, [System.Text.Encoding]::UTF8)

    $Writer.WriteLine("Component Portfolio - Project Structure for AI Analysis")
    $Writer.WriteLine("=" * 60)
    $Writer.WriteLine("Project: Component Portfolio")
    $Writer.WriteLine("Path: $ProjectPath")
    $Writer.WriteLine("Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')")
    $Writer.WriteLine("Max Depth: $MaxDepth levels")
    $Writer.WriteLine("")
    $Writer.WriteLine("Purpose: Shows only files useful for AI code understanding")
    $Writer.WriteLine("")
    $Writer.WriteLine("Legend:")
    $Writer.WriteLine("|-- File or folder")
    $Writer.WriteLine("+-- Last item in directory")
    $Writer.WriteLine("folder/ - Directory")
    $Writer.WriteLine("")
    $Writer.WriteLine("Includes:")
    $Writer.WriteLine("- React source files (.jsx, .js, .tsx, .ts)")
    $Writer.WriteLine("- Styles (.css)")
    $Writer.WriteLine("- HTML files (.html)")
    $Writer.WriteLine("- Configuration files (.json, vite.config.js, tailwind.config.js)")
    $Writer.WriteLine("- Documentation files (.md, .txt)")
    $Writer.WriteLine("")
    $Writer.WriteLine("Excludes:")
    $Writer.WriteLine("- Images and media files (.png, .jpg, .webp, .svg, etc.)")
    $Writer.WriteLine("- Build artifacts (node_modules, dist, build)")
    $Writer.WriteLine("- Public assets folder")
    $Writer.WriteLine("- PowerShell scripts (.ps1)")
    $Writer.WriteLine("- Lock files and logs")
    $Writer.WriteLine("")
    $Writer.WriteLine("Project Structure:")
    $Writer.WriteLine("")

    # Write the actual structure
    $rootName = Split-Path -Leaf $ProjectPath
    $Writer.WriteLine("$rootName/")
    Write-ProjectStructure -Path $ProjectPath -Writer $Writer -MaxDepth $MaxDepth

    # Add summary
    $Writer.WriteLine("")
    $Writer.WriteLine("Summary:")
    $Writer.WriteLine("- Total files in project: $($AllFiles.Count)")
    $Writer.WriteLine("- AI-relevant files shown: $RelevantFiles")
    $Writer.WriteLine("- Files excluded: $($AllFiles.Count - $RelevantFiles)")
    $Writer.WriteLine("- Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')")

    $Writer.Close()

    Write-Host ""
    Write-Host "============================================================" -ForegroundColor DarkGray
    Write-Host "Component Portfolio structure generated successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "File saved to:" -ForegroundColor White
    Write-Host "  $ReportPath" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "AI-relevant files: $RelevantFiles of $($AllFiles.Count) total files" -ForegroundColor Yellow
    Write-Host "File prefix: $ProjectPrefix-" -ForegroundColor Yellow
    Write-Host "============================================================" -ForegroundColor DarkGray
    Write-Host "✓ Ready for AI evaluation!" -ForegroundColor Green
}
catch {
    Write-Error "Error generating project structure: $($_.Exception.Message)"
    Write-Host "Stack trace: $($_.ScriptStackTrace)" -ForegroundColor Red
}

Write-Host ""
Write-Host "Script execution completed." -ForegroundColor Green
