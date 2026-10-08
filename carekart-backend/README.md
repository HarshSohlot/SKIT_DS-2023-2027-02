# CareKart Backend - Sprints 1 to 3

## Stack
- Java 17
- Spring Boot
- Spring Web
- Lombok
- MongoDB
- Spring Security
- JWT
- BCrypt
- Maven

## Sprint 1
Spring Boot/Spring Web setup, layered architecture, Lombok, User model, DTOs and health API.

## Sprint 2
MongoDB integration, User document, repository and persistent user registration.

## Sprint 3
JWT authentication, BCrypt password hashing, JWT filter and protected APIs.

## Requirements
- Java 17+
- Maven
- MongoDB running locally on port 27017, or change `spring.data.mongodb.uri`.

## Run
```bash
mvn spring-boot:run
```

## Test

### Health
GET `http://localhost:8080/api/health`

### Register
POST `http://localhost:8080/api/auth/register`

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "role": "DONOR"
}
```

### Login
POST `http://localhost:8080/api/auth/login`

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

Copy the returned JWT and call:

GET `http://localhost:8080/api/users/{id}`

Header:

`Authorization: Bearer <JWT>`

Do not commit real JWT secrets or database credentials to Git.
