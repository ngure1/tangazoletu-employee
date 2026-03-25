.PHONY: backend frontend

backend:
	cd backend && ./mvnw spring-boot:run

frontend:
	cd frontend && pnpm dev
