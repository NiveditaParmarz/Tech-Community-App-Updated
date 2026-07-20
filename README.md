# 💻 Tech Community

A full-stack Q&A platform where developers can ask questions, share answers, and help each other solve real-world problems — built with **Angular** on the frontend and **Spring Boot** on the backend.

> Where developers help developers solve real-world problems.

---

## 📸 Screenshots

<!--
  Add your screenshots below. Create a `screenshots/` folder at the project root,
  drop your images in there, and update the paths if your filenames differ.
-->

### 🏠 Landing Page
<img width="1878" height="949" alt="image" src="https://github.com/user-attachments/assets/48dbed25-f46b-4d2b-ba2c-46971661d2b3" />

### 🔐 Login / Register
<img width="1881" height="960" alt="image" src="https://github.com/user-attachments/assets/7d0ae153-536a-426a-b436-f858450eb46a" />

### 🧵 Home / Question Feed
<img width="1869" height="945" alt="image" src="https://github.com/user-attachments/assets/bcc6c88a-0017-4c32-ad8b-8cff050d0a6b" />
<img width="1872" height="960" alt="image" src="https://github.com/user-attachments/assets/0538d5bf-5c92-4f3a-832a-4bd310a4665e" />

### 🔍 Search
<img width="1882" height="948" alt="image" src="https://github.com/user-attachments/assets/653e1790-1fbe-4cbb-9473-d25dcfc16478" />

### ❓ Question Details
<img width="1875" height="929" alt="image" src="https://github.com/user-attachments/assets/f11e692a-3269-43fb-9f07-c553f7d5950c" />

### ✍️ Post a Question
<img width="1866" height="961" alt="image" src="https://github.com/user-attachments/assets/4aba8961-327c-439a-92b4-f551bdb4e76c" />

### 📝 My Questions
<img width="1901" height="967" alt="image" src="https://github.com/user-attachments/assets/41080420-f7d1-46de-8fe4-40db1aba01d5" />

---

## ✨ Features

- 🔑 User registration & login with BCrypt-encrypted passwords
- ❓ Ask, search, and filter questions (by text, tag, author, date)
- 💬 Comment on questions, with like support
- 👀 View tracking per question
- ⚡ Server-side rendering (SSR) on the frontend via Angular Universal

## 🛠️ Tech Stack

**Frontend** — `product-community-ui/`
- Angular 21 (standalone components, SSR via `@angular/ssr` + Express)
- RxJS, Reactive Forms

**Backend** — `product-community-api/`
- Java 17, Spring Boot 4.0.1
- Spring Security (BCrypt password hashing, CORS configured for local dev)
- Spring Data JPA
- MySQL
- Maven + Lombok

## 📂 Project Structure

```
Exit-Test-Application/
├── product-community-api/    # Spring Boot REST API
│   └── src/main/resources/   # application*.properties per environment
└── product-community-ui/     # Angular frontend
    └── src/environments/     # environment.ts (dev) / environment.prod.ts
```

## 🚀 Getting Started

### ✅ Prerequisites
- Java 17
- Node.js + npm
- MySQL running locally

### 1️⃣ Backend setup

```bash
cd product-community-api

# create the database
mysql -u root -p -e "CREATE DATABASE product_community_db;"
```

Check `src/main/resources/application-dev.properties` matches your local MySQL credentials (defaults to `root`/`root` on `localhost:3306`), then run:

```bash
./mvnw spring-boot:run
```

The API starts on the port set in `application.properties` (`server.port`), defaulting to `8080` if unset.

### 2️⃣ Frontend setup

```bash
cd product-community-ui
npm install
npm start
```

The app runs at `http://localhost:4200`. Make sure `src/environments/environment.ts` → `apiUrl` matches the port your backend is running on.

## 📡 API Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in |
| POST | `/api/questions` | Create a question |
| GET | `/api/questions/{id}` | Get a question (increments views) |
| GET | `/api/questions/search` | Search questions (`text`, `email`, `tag`, `date`, `page`, `size`, `sort`) |
| POST | `/api/comments` | Add a comment |
| GET | `/api/comments/by-question?questionId={id}` | Get comments for a question |
| POST | `/api/comments/{id}/like` | Like a comment |

##  Environment Profiles

The backend ships with multiple Spring profiles under `application-*.properties` (`dev`, `azure`, `azure-test`, `prod`), selected via the `ENV` variable. Profiles other than `dev` expect `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD` to be supplied as environment variables rather than committed to the repo.
