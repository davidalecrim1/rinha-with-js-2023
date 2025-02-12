# Rinha de Backend with JS (Edition 2023/Q3)

A blazing-fast REST API built with Node.js and Express, developed for the [Rinha de Backend Q3 2023](https://github.com/zanfranceschi/go-rinha-de-backend-2023-q3) challenge. This performance-focused competition demands that APIs handle intense loads using minimal resources (just 1.5 CPU cores and 3GB RAM). The project demonstrates clean architecture, efficient database management, and production-ready practices while achieving high throughput under heavy concurrency.

There is an alternative version using **Deno** with **Typescript** instead of **Node.js** in the branch `deno-version`.

## 🎯 Challenge Overview

Develop a REST API capable of:
- **Creating People:** Accepting JSON payloads to register people with unique nicknames.
- **Retrieving Details:** Providing person details by UUID.
- **Searching:** Finding people by a search term across nickname, name, or technology stack.
- **Counting Records:** Exposing an endpoint that returns the total number of people created.
- **High Concurrency:** Handling simultaneous requests robustly within strict resource limits.

## 🚀 Technical Stack

- **API Framework:** Express.js – for high-performance HTTP routing and middleware support.
- **Database:** PostgreSQL – ensuring durability and performance, interfaced via the `pg` driver.
- **Load Balancer:** Nginx – for efficient, round-robin distribution of incoming requests across API instances.
- **Architecture:**
  - Clean separation of concerns following Domain-Driven Design principles.
  - Repository pattern to abstract data persistence.
  - Dependency injection for modular and testable code.
  - Custom middleware for validation, logging, and error handling.

## 🏗️ Project Structure

- **src/** – Contains API source code including routes, controllers, and services.
- **infra/** – Handles database configuration and repository implementation.
- **test/** – End-to-end tests that validate API endpoints and behavior.
- **docker-compose.yml** – Defines the containerized environment (API instances, PostgreSQL, and Nginx).
- **stress-test/** – Scripts and resources for running performance stress tests with Gatling.

## Getting Started

1. **Install Docker:** Ensure Docker is installed on your machine.
2. **Build and Run Containers:**  
   Use either of the following commands:
   - Docker Compose:  
     ```bash
     docker compose up -d --build
     ```
   - Makefile:  
     ```bash
     make build-and-run
     ```
3. **Access the API:** Once the containers are up, the API will be available through port `9999`.

## Stack Overview

- **Express.js:** Provides a robust foundation for REST routes, middleware pipelines, and error handling.
- **Node.js:** Executes the application with high scalability and efficiency.
- **PostgreSQL:** A reliable relational database ensuring data persistence and consistency.
- **Nginx:** Serves as a reverse proxy and load balancer, distributing requests seamlessly across API instances.

## References

- **Original Go Version:** [Rinha de Backend in 2023 with Go](https://github.com/davidalecrim1/rinha-with-go-2023)
- **Challenge Details:** [Rinha de Backend Q3 2023](https://github.com/zanfranceschi/go-rinha-de-backend-2023-q3)