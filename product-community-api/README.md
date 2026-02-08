# Product Community API

A REST API for a technical Q&A community platform where developers can ask questions, share answers, and collaborate.

## 🚀 Features

- User authentication with secure password encryption
- Question management with advanced search and filtering
- Comment system with like functionality
- View tracking for questions
- CORS support for frontend integration

## 🛠️ Tech Stack

- **Java 17** + **Spring Boot 4.0.1**
- **Spring Security** + **Spring Data JPA**
- **MySQL** database
- **Maven** + **Lombok**

## 🚀 Quick Start

### 1. Database Setup
```sql
CREATE DATABASE product_community_db;
```

### 2. Configure Database
Update `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/product_community_db
spring.datasource.username=root
spring.datasource.password=root
```

### 3. Run Application
```bash
mvn spring-boot:run
```

API runs at `http://localhost:8080`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Questions
- `POST /api/questions` - Create question
- `GET /api/questions/{id}` - Get question (increments views)
- `GET /api/questions/search` - Search with filters

### Comments
- `POST /api/comments` - Add comment
- `GET /api/comments/by-question?questionId={id}` - Get comments
- `POST /api/comments/{id}/like` - Like comment

## 🔍 Search Parameters
- `text` - Search in question text
- `email` - Filter by author
- `tag` - Filter by tags
- `date` - Filter by date (yyyy-MM-dd)
- `page` - Page number (default: 0)
- `size` - Page size (default: 5)
- `sort` - Sort: "newest" or "oldest"

Example: `GET /api/questions/search?text=java&tag=spring&page=0&size=10`

## 📊 Database Schema

**Users**: id, name, email (unique), password (encrypted)
**Questions**: id, questionText, tags, createdBy, createdDate, views
**Comments**: id, questionId, commentText, commentedBy, likes

## 📝 Example Requests

### Register User
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Question
```json
POST /api/questions
{
  "questionText": "How to implement JWT in Spring Boot?",
  "tags": "spring,security,jwt",
  "createdBy": "john@example.com"
}
```

## 🔐 Security

- BCrypt password encryption
- CORS configured for localhost
- Ready for production security hardening

---

**Note**: Designed to work with the Angular frontend. Both apps should run together for the full experience.
