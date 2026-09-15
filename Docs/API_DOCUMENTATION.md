# 📖 TechRoad REST API Reference

The TechRoad API is a RESTful service exposing resources for authentication, curriculum roadmaps, and progress tracking.

- **Base URL (Local)**: `http://localhost:5000/api`
- **Swagger Documentation**: `http://localhost:5000/swagger`
- **Authentication Scheme**: `Authorization: Bearer <JWT_TOKEN>`

---

## 1. Authentication Endpoints (`/api/auth`)

### 1.1 Register User
- **Method**: `POST`
- **Path**: `/api/auth/register`
- **Auth Required**: No

**Request Body:**
```json
{
  "username": "developer123",
  "email": "dev@example.com",
  "password": "SecurePassword123!"
}
```

**Response (`200 OK`):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "developer123",
  "email": "dev@example.com",
  "expiresAt": "2026-09-15T17:00:00Z"
}
```

---

### 1.2 Login User
- **Method**: `POST`
- **Path**: `/api/auth/login`
- **Auth Required**: No

**Request Body:**
```json
{
  "email": "dev@example.com",
  "password": "SecurePassword123!"
}
```

**Response (`200 OK`):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "developer123",
  "email": "dev@example.com",
  "expiresAt": "2026-09-15T17:00:00Z"
}
```

---

### 1.3 Get Current User Profile
- **Method**: `GET`
- **Path**: `/api/auth/me`
- **Auth Required**: Yes (`Bearer <token>`)

**Response (`200 OK`):**
```json
{
  "username": "developer123",
  "email": "dev@example.com",
  "roadmapsStarted": 3,
  "averageProgress": 65,
  "totalCompletedLevels": 6,
  "totalProjectsBuilt": 5
}
```

---

## 2. Roadmap Endpoints (`/api/roadmap`)

### 2.1 Get All Categories & Roadmaps
- **Method**: `GET`
- **Path**: `/api/roadmap`
- **Auth Required**: No

**Response (`200 OK`):**
```json
[
  {
    "name": "Frontend",
    "color": "#e0f2fe",
    "guide": "Frontend developers build client-side web applications...",
    "technologies": [
      {
        "name": "React",
        "group": "Frameworks",
        "color": "#61dafb",
        "levels": [
          {
            "name": "Basics",
            "topics": ["JSX", "Components", "Props", "State"]
          }
        ]
      }
    ]
  }
]
```

### 2.2 Get Category by Name
- **Method**: `GET`
- **Path**: `/api/roadmap/{categoryName}`
- **Auth Required**: No

### 2.3 Get Technology by Name
- **Method**: `GET`
- **Path**: `/api/roadmap/tech/{techName}`
- **Auth Required**: No

---

## 3. Progress Tracking Endpoints (`/api/progress`)

### 3.1 Get User Tracked Technologies
- **Method**: `GET`
- **Path**: `/api/progress`
- **Auth Required**: Yes (`Bearer <token>`)

**Response (`200 OK`):**
```json
[
  {
    "username": "developer123",
    "technology": "React",
    "basics": true,
    "intermediate": true,
    "advanced": false,
    "projects": 2,
    "score": 60,
    "lastUpdated": "2026-09-14T17:00:00Z"
  }
]
```

---

### 3.2 Get User Aggregated Statistics
- **Method**: `GET`
- **Path**: `/api/progress/stats`
- **Auth Required**: Yes (`Bearer <token>`)

**Response (`200 OK`):**
```json
{
  "technologiesTracked": 3,
  "averageScore": 65,
  "completedRoadmaps": 1,
  "totalProjects": 5,
  "totalLevelsCompleted": 6
}
```

---

### 3.3 Save or Update Technology Progress
- **Method**: `POST`
- **Path**: `/api/progress`
- **Auth Required**: Yes (`Bearer <token>`)

**Request Body:**
```json
{
  "technology": "React",
  "basics": true,
  "intermediate": true,
  "advanced": false,
  "projects": 2
}
```

**Response (`200 OK`):**
```json
{
  "username": "developer123",
  "technology": "React",
  "basics": true,
  "intermediate": true,
  "advanced": false,
  "projects": 2,
  "score": 60,
  "lastUpdated": "2026-09-14T17:05:00Z"
}
```
