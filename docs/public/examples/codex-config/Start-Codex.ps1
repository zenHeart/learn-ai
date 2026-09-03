param(
    [Parameter(Mandatory = $true)]
    [ValidateSet('official', 'api')]
    [string]$Mode,
    [Parameter(Mandatory = $true)]
    [ValidateSet('cli', 'app')]
    [string]$Surface
)

$ErrorActionPreference = 'Stop'
$targetHome = Join-Path $env:USERPROFILE $(if ($Mode -eq 'api') { '.codex-api' } else { '.codex' })
if (-not (Test-Path -LiteralPath (Join-Path $targetHome 'config.toml'))) {
    throw 'Create and review the target config.toml first.'
}

# A second launch may reuse an existing desktop process and its old environment.
if ($Surface -eq 'app') {
    $running = Get-CimInstance Win32_Process | Where-Object {
        $_.Name -in @('ChatGPT.exe', 'Codex.exe') -and
        $_.ExecutablePath -like '*WindowsApps*OpenAI.Codex*'
    }
    if ($running) { throw 'Quit the desktop app completely before switching HOME.' }
    $package = Get-AppxPackage -Name 'OpenAI.Codex' |
        Sort-Object Version -Descending | Select-Object -First 1
    if (-not $package) { throw 'The OpenAI.Codex MSIX package was not found.' }
    $appExe = Join-Path $package.InstallLocation 'app\ChatGPT.exe'
    if (-not (Test-Path -LiteralPath $appExe)) {
        throw 'The installed app layout changed; verify its executable path.'
    }
}

$previousHome = [Environment]::GetEnvironmentVariable('CODEX_HOME', 'Process')
try {
    $env:CODEX_HOME = $targetHome
    if ($Surface -eq 'cli') {
        & codex
    } else {
        Start-Process -FilePath $appExe | Out-Null
    }
} finally {
    [Environment]::SetEnvironmentVariable('CODEX_HOME', $previousHome, 'Process')
}
