# Gamified Docker Commands

.PHONY: help build up down logs clean dev prod restart

help: ## Show this help message
	@echo "Available commands:"
	@awk 'BEGIN {FS = ":.*##"; printf "\n"} /^[a-zA-Z_-]+:.*##/ { printf "  %-15s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

build: ## Build all Docker images
	docker-compose build

up: ## Start all services in production mode
	docker-compose up -d

down: ## Stop all services
	docker-compose down

logs: ## Show logs for all services
	docker-compose logs -f

clean: ## Remove all containers, networks, and volumes
	docker-compose down -v --remove-orphans
	docker system prune -f

dev: ## Start development environment (Strapi only)
	docker-compose -f docker-compose.dev.yml up -d

dev-logs: ## Show development logs
	docker-compose -f docker-compose.dev.yml logs -f

dev-down: ## Stop development environment
	docker-compose -f docker-compose.dev.yml down

prod: ## Build and start production environment
	docker-compose build
	docker-compose up -d

restart: ## Restart all services
	docker-compose restart

shell-strapi: ## Open shell in Strapi container
	docker-compose exec strapi sh

shell-nextjs: ## Open shell in Next.js container
	docker-compose exec nextjs sh

shell-postgres: ## Open PostgreSQL shell
	docker-compose exec postgres psql -U strapi -d gamified

backup-db: ## Backup database
	docker-compose exec postgres pg_dump -U strapi gamified > backup_$(shell date +%Y%m%d_%H%M%S).sql

restore-db: ## Restore database (usage: make restore-db FILE=backup.sql)
	docker-compose exec -T postgres psql -U strapi -d gamified < $(FILE)

status: ## Show status of all services
	docker-compose ps