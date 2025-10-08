# Gamified LaunchPad - Docker Management Script for Windows

param(
    [string]$Command = "help"
)

function Show-Help {
    Write-Host "Gamified LaunchPad - Docker Management Commands" -ForegroundColor Green
    Write-Host ""
    Write-Host "Usage: .\docker.ps1 [command]" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Available commands:" -ForegroundColor Cyan
    Write-Host "  help          Show this help message"
    Write-Host "  build         Build all Docker images"
    Write-Host "  up            Start all services in production mode"
    Write-Host "  down          Stop all services"
    Write-Host "  logs          Show logs for all services"
    Write-Host "  clean         Remove all containers, networks, and volumes"
    Write-Host "  dev           Start development environment"
    Write-Host "  dev-logs      Show development logs"
    Write-Host "  dev-down      Stop development environment"
    Write-Host "  prod          Build and start production environment"
    Write-Host "  restart       Restart all services"
    Write-Host "  status        Show status of all services"
    Write-Host "  shell-strapi  Open shell in Strapi container"
    Write-Host "  shell-nextjs  Open shell in Next.js container"
    Write-Host "  backup-db     Backup database"
    Write-Host ""
}

function Invoke-DockerCommand {
    param([string]$cmd)
    
    try {
        Invoke-Expression $cmd
    }
    catch {
        Write-Host "Error executing command: $cmd" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
}

switch ($Command.ToLower()) {
    "help" { Show-Help }
    "build" { 
        Write-Host "Building Docker images..." -ForegroundColor Green
        Invoke-DockerCommand "docker-compose build" 
    }
    "up" { 
        Write-Host "Starting all services..." -ForegroundColor Green
        Invoke-DockerCommand "docker-compose up -d" 
    }
    "down" { 
        Write-Host "Stopping all services..." -ForegroundColor Yellow
        Invoke-DockerCommand "docker-compose down" 
    }
    "logs" { 
        Write-Host "Showing logs..." -ForegroundColor Blue
        Invoke-DockerCommand "docker-compose logs -f" 
    }
    "clean" { 
        Write-Host "Cleaning up containers, networks, and volumes..." -ForegroundColor Red
        Invoke-DockerCommand "docker-compose down -v --remove-orphans"
        Invoke-DockerCommand "docker system prune -f"
    }
    "dev" { 
        Write-Host "Starting development environment..." -ForegroundColor Green
        Invoke-DockerCommand "docker-compose -f docker-compose.dev.yml up -d" 
    }
    "dev-logs" { 
        Write-Host "Showing development logs..." -ForegroundColor Blue
        Invoke-DockerCommand "docker-compose -f docker-compose.dev.yml logs -f" 
    }
    "dev-down" { 
        Write-Host "Stopping development environment..." -ForegroundColor Yellow
        Invoke-DockerCommand "docker-compose -f docker-compose.dev.yml down" 
    }
    "prod" { 
        Write-Host "Building and starting production environment..." -ForegroundColor Green
        Invoke-DockerCommand "docker-compose build"
        Invoke-DockerCommand "docker-compose up -d"
    }
    "restart" { 
        Write-Host "Restarting all services..." -ForegroundColor Yellow
        Invoke-DockerCommand "docker-compose restart" 
    }
    "status" { 
        Write-Host "Service status:" -ForegroundColor Blue
        Invoke-DockerCommand "docker-compose ps" 
    }
    "shell-strapi" { 
        Write-Host "Opening Strapi shell..." -ForegroundColor Blue
        Invoke-DockerCommand "docker-compose exec strapi sh" 
    }
    "shell-nextjs" { 
        Write-Host "Opening Next.js shell..." -ForegroundColor Blue
        Invoke-DockerCommand "docker-compose exec nextjs sh" 
    }
    "backup-db" { 
        $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
        $filename = "backup_$timestamp.sql"
        Write-Host "Creating database backup: $filename" -ForegroundColor Green
        Invoke-DockerCommand "docker-compose exec postgres pg_dump -U strapi gamified > $filename"
    }
    default { 
        Write-Host "Unknown command: $Command" -ForegroundColor Red
        Show-Help 
    }
}