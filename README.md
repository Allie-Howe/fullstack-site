# Fullstack Monorepo Boilerplate (React/Express/TypeORM)

This is a boilerplate project designed to easily create full-stack applications. It includes a React frontend and an Express.js backend using TypeORM, structured within a pnpm monorepo.

## Features

*   **Monorepo:** Managed with pnpm workspaces for streamlined dependency management and scripting. See [here](https://pnpm.io/motivation) for more info on pnpm.
*   **Backend:**
    *   Express.js with TypeScript.
    *   TypeORM for database interaction (pre-configured for MySQL).
    *   JWT-based authentication (endpoints for registration and login).
    *   Password hashing using `bcryptjs`.
    *   Environment variable management with `dotenv`.
*   **Frontend:**
    *   React with Vite for a fast and modern development experience.

## Getting Started

### Prerequisites

*   Node.js (v16 or higher recommended)
*   pnpm (Install with `npm install -g pnpm` if you haven't already)
*   A MySQL database instance.

### Installation

1.  **Fork this repository.**
2.  **Clone your forked repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-name>
    ```
3.  **Install dependencies from the root directory:**
    ```bash
    pnpm install
    ```
    This will install dependencies for all packages in the monorepo.

### API Configuration (`api/.env`)

The backend API requires environment variables for its configuration. Create a `.env` file in the `api/` directory (`api/.env`) with the following content.

Example `.env` file:
```bash
# MySQL Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=user
DB_PASSWORD=pass
DB_NAME=database

JWT_SECRET=sample-jwt-secret

# API Port (Optional, defaults to 3001)
# PORT=3001
```
