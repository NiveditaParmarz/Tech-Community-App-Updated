# Tech Community API Documentation

## 📋 Overview

The **Tech Community API** is a RESTful backend service built with **Spring Boot 4.0.1** and **Java 17**. It provides a platform for users to ask technical questions, post answers, and interact with a community of developers.

### 🎯 **Purpose**
- Enable developers to ask and answer technical questions
- Provide search functionality for questions
- Support user authentication and authorization
- Facilitate community engagement through comments and likes

### 🛠 **Technology Stack**
- **Backend**: Java 17, Spring Boot 4.0.1
- **Security**: Spring Security, JWT Authentication, CSRF Protection
- **Database**: MySQL with Spring Data JPA
- **Build Tool**: Maven
- **Utilities**: Lombok for boilerplate code reduction

---

## 🔐 **Authentication & Security**

### **Security Features**
- **JWT Token Authentication**: Stateless token-based authentication
- **CSRF Protection**: Cross-Site Request Forgery protection enabled
- **Password Encryption**: BCrypt password hashing
- **CORS Support**: Configured for frontend integration

### **Authentication Flow**
1. **Register** → Create account → Receive JWT token
2. **Login** → Validate credentials → Receive JWT token
3. **API Calls** → Include JWT token in `Authorization` header

### **Security Headers**
```http
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
X-CSRF-TOKEN: <CSRF_TOKEN> (for POST/PUT/DELETE)
```

---

## 🚀 **API Endpoints**

### **🔓 Public Endpoints** (No Authentication Required)

#### **User Authentication**

##### **Register New User**
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

**Error Responses:**
- `400 Bad Request`: Email already exists
- `500 Internal Server Error`: Registration failed

---

##### **User Login**
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

**Error Responses:**
- `400 Bad Request`: Invalid credentials
- `500 Internal Server Error`: Login failed

---

### **🔒 Protected Endpoints** (JWT Token Required)

#### **📝 Questions Management**

##### **Post New Question**
```http
POST /api/questions
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**
```json
{
  "questionText": "How to implement JWT authentication in Spring Boot?",
  "tags": "spring-boot, jwt, security",
  "createdBy": "john@example.com"
}
```

**Response:**
```json
{
  "id": 1,
  "questionText": "How to implement JWT authentication in Spring Boot?",
  "tags": "spring-boot, jwt, security",
  "createdBy": "john@example.com",
  "createdDate": "2026-02-08",
  "views": 0,
  "commentsCount": 0
}
```

---

##### **Get Question by ID**
```http
GET /api/questions/{id}
Authorization: Bearer <JWT_TOKEN>
```

**Path Parameters:**
- `id` (Long): Question ID

**Response:**
```json
{
  "id": 1,
  "questionText": "How to implement JWT authentication in Spring Boot?",
  "tags": "spring-boot, jwt, security",
  "createdBy": "john@example.com",
  "createdDate": "2026-02-08",
  "views": 15,
  "commentsCount": 3
}
```

**Error Responses:**
- `404 Not Found`: Question not found
- `403 Forbidden`: Invalid/missing JWT token

---

##### **Search Questions**
```http
GET /api/questions/search?text={text}&email={email}&tag={tag}&date={date}&page={page}&size={size}&sort={sort}
Authorization: Bearer <JWT_TOKEN>
```

**Query Parameters:**
- `text` (String, optional): Search in question text
- `email` (String, optional): Filter by creator email
- `tag` (String, optional): Filter by tag
- `date` (Date, optional): Filter by creation date (ISO format: YYYY-MM-DD)
- `page` (int, default: 0): Page number
- `size` (int, default: 5): Page size
- `sort` (String, default: "newest"): Sort order ("newest" or "oldest")

**Example Request:**
```http
GET /api/questions/search?text=spring-boot&tag=java&page=0&size=10&sort=newest
```

**Response:**
```json
{
  "content": [
    {
      "id": 2,
      "questionText": "How to change server port from 8080 in spring boot?",
      "tags": "spring-boot, java",
      "createdBy": "nivedita@gmail.com",
      "createdDate": "2026-01-29",
      "views": 9,
      "commentsCount": 1
    },
    {
      "id": 1,
      "questionText": "How to enable Lombok in IntelliJ?",
      "tags": "spring-boot, java, annotation",
      "createdBy": "rishparna@gmail.com",
      "createdDate": "2026-01-27",
      "views": 23,
      "commentsCount": 3
    }
  ],
  "empty": false,
  "first": true,
  "last": true,
  "number": 0,
  "numberOfElements": 2,
  "pageable": {
    "offset": 0,
    "pageNumber": 0,
    "pageSize": 10,
    "paged": true,
    "sort": {
      "empty": false,
      "sorted": true,
      "unsorted": false
    },
    "unpaged": false
  },
  "size": 10,
  "sort": {
    "empty": false,
    "sorted": true,
    "unsorted": false
  },
  "totalElements": 2,
  "totalPages": 1
}
```

---

#### **💬 Comments Management**

##### **Get Comments by Question ID**
```http
GET /api/comments/by-question?questionId={questionId}
Authorization: Bearer <JWT_TOKEN>
```

**Query Parameters:**
- `questionId` (Long, required): Question ID

**Response:**
```json
[
  {
    "id": 1,
    "questionId": 1,
    "commentText": "You can enable Lombok by installing the plugin and adding annotation processing.",
    "commentedBy": "developer@example.com",
    "likes": 5
  },
  {
    "id": 2,
    "questionId": 1,
    "commentText": "Also make sure to add the Lombok dependency in your pom.xml",
    "commentedBy": "expert@example.com",
    "likes": 3
  }
]
```

---

##### **Add Comment**
```http
POST /api/comments
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**
```json
{
  "questionId": 1,
  "commentText": "Here's how you can solve this issue...",
  "commentedBy": "john@example.com"
}
```

**Response:**
```json
{
  "id": 3,
  "questionId": 1,
  "commentText": "Here's how you can solve this issue...",
  "commentedBy": "john@example.com",
  "likes": 0
}
```

---

##### **Like Comment**
```http
POST /api/comments/{id}/like
Authorization: Bearer <JWT_TOKEN>
```

**Path Parameters:**
- `id` (Long): Comment ID

**Response:**
```json
{
  "id": 1,
  "questionId": 1,
  "commentText": "You can enable Lombok by installing the plugin...",
  "commentedBy": "developer@example.com",
  "likes": 6
}
```

---

## 📊 **Data Models**

### **User Model**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "password": "encrypted_password"
}
```

### **Question Model**
```json
{
  "id": 1,
  "questionText": "How to implement JWT authentication?",
  "tags": "spring-boot, jwt, security",
  "createdBy": "john@example.com",
  "createdDate": "2026-02-08",
  "views": 15,
  "commentsCount": 3
}
```

### **Comment Model**
```json
{
  "id": 1,
  "questionId": 1,
  "commentText": "Here's the solution...",
  "commentedBy": "developer@example.com",
  "likes": 5
}
```

---

## ⚠️ **Error Handling**

### **Standard Error Response Format**
```json
{
  "timestamp": "2026-02-08T11:15:30.123+00:00",
  "status": 403,
  "error": "Forbidden",
  "message": "Access Denied",
  "path": "/api/questions/search"
}
```

### **Common HTTP Status Codes**
- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: Access denied
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

---

## 🔧 **Configuration**

### **Environment Variables**
```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/product_community_db
spring.datasource.username=root
spring.datasource.password=root

# JWT Configuration
jwt.secret=mySuperSecretKeyForJWTTokenGenerationThatIsLongEnoughToMeet256BitRequirement
jwt.expiration=86400000

# Server Configuration
server.port=8080
```

### **CORS Configuration**
- **Allowed Origins**: `http://localhost:*`, `http://127.0.0.1:*`
- **Allowed Methods**: GET, POST, PUT, DELETE, OPTIONS
- **Allowed Headers**: All headers
- **Credentials**: Enabled

---

## 🚀 **Deployment**

### **Local Development**
```bash
# Clone repository
git clone https://github.com/NiveditaParmarz/Tech-Community-App-Updated.git

# Navigate to backend
cd product-community-api

# Run application
mvn spring-boot:run
```

### **Production Deployment**
- **Platform**: Railway
- **Repository**: Connected to GitHub branch `Exit-Test-Application`
- **Automatic Deployment**: Enabled on git push
- **Environment**: Production variables configured

---

## 📝 **Usage Examples**

### **Complete User Flow**
```bash
# 1. Register user
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# 2. Login (get token)
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# 3. Post question (with token)
curl -X POST http://localhost:8080/api/questions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"questionText":"How to use Spring Security?","tags":"spring-boot,security","createdBy":"john@example.com"}'

# 4. Search questions
curl -X GET "http://localhost:8080/api/questions/search?text=spring-boot&page=0&size=5" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🔒 **Security Considerations**

### **Implemented Security Measures**
1. **JWT Authentication**: Stateless token-based auth
2. **CSRF Protection**: Prevents cross-site request forgery
3. **Password Encryption**: BCrypt hashing for passwords
4. **CORS Configuration**: Controlled cross-origin access
5. **Input Validation**: Request data validation
6. **Error Handling**: Secure error responses

### **Security Best Practices**
- JWT tokens expire after 24 hours
- Passwords are never stored in plain text
- All sensitive endpoints require authentication
- CORS is configured for specific origins only
- CSRF tokens are required for state-changing operations

---

### **Documentation Version**
- **Version**: 1.0.0
- **Last Updated**: February 8, 2026
- **API Version**: v1

---

*This API documentation covers all endpoints, authentication, security measures, and usage examples for the Tech Community Application.*
