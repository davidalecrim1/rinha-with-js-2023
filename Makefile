# For testing locally
dev-build-and-run:
	docker compose -f ./docker-compose.dev.yml up -d --build

dev-run:
	docker compose -f ./docker-compose.dev.yml up -d

dev-stop:
	docker compose -f ./docker-compose.dev.yml down

dev-restart:
	make dev-stop
	make dev-build-and-run

clear-cache:
	npm cache clean --force

# For testing with full environment in Windows or MacOS (limits, nginx, etc)
build-and-run:
	docker compose -f ./docker-compose.yml up -d --build

run:
	docker compose -f ./docker-compose.yml up -d

stop:
	docker compose -f ./docker-compose.yml down

restart:
	make stop
	make build-and-run