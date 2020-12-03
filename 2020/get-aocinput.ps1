# AOC
Function Get-AoCInput {
    Param (
        [int]$day
    )

    $uri = "https://adventofcode.com/2020/day/$day/input";
    $filename = "day$day.txt"
    Write-Host "Downloading $uri to $filename"

    Invoke-WebRequest -Uri $uri -Headers @{"cookie"="session=$env:AOCCOOKIE"} -OutFile $filename

}