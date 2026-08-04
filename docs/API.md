# 🔌 Shiora One REST API Specification

Base URL: `http://localhost:8080/api/v1`

Swagger UI: `http://localhost:8080/api/swagger-ui.html`

## 1. Authentication Endpoints

### POST `/auth/login`
- **Request Body**:
  ```json
  {
    "email": "user@shiora.one",
    "password": "password123"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "success": true,
    "message": "Authentication successful",
    "data": {
      "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiJ9...",
      "username": "user@shiora.one"
    }
  }
  ```

### POST `/auth/register`
- **Request Body**:
  ```json
  {
    "username": "sakura_dev",
    "displayName": "Sakura",
    "email": "sakura@shiora.one",
    "password": "password123"
  }
  ```

## 2. Tasks Endpoints

### GET `/tasks`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK`

### POST `/tasks`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "title": "Build Spring Boot Security Filter",
    "priority": "HIGH",
    "dueDate": "2026-08-05T10:00:00Z",
    "tags": ["Backend", "Security"]
  }
  ```
