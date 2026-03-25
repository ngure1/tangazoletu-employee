# Employee Management App

This project has:

- a Spring Boot backend in `backend`
- a Next.js frontend in `frontend`

## Run both apps

Use two terminals from the project root.

In the first terminal, start the backend with:

```bash
make backend
```

In the second terminal, start the frontend with:

```bash
make frontend
```

This starts:

- the backend on `http://localhost:8080`
- the frontend on `http://localhost:3000`

Before starting either app, make sure nothing else is already running on ports `8080` or `3000`.

## Run each app separately

Backend:

```bash
make backend
```

Frontend:

```bash
make frontend
```

## Notes

- The frontend expects the backend to be available locally.
- The H2 console is available at `http://localhost:8080/h2-console`.
