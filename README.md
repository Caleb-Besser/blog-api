# Blog API

A RESTful API for a blog platform built with Node.js, Express, and PostgreSQL. Features user authentication, blog posts, and comments with JWT-based authorization.

## Technologies Used

-   **Node.js** - JavaScript runtime
-   **Express** - Web framework
-   **PostgreSQL** - Relational database
-   **JWT** - JSON Web Tokens for authentication
-   **bcrypt** - Password hashing

## Features

-   User registration and authentication with JWT
-   Secure password hashing with bcrypt
-   CRUD operations for blog posts
-   CRUD operations for comments
-   User authorization (users can only edit/delete their own comments)
-   Pagination support for posts
-   Search functionality for posts
-   RESTful API design

## Prerequisites

-   Node.js (v14 or higher)
-   PostgreSQL (v12 or higher)
-   npm or yarn

## Installation

1. Clone the repository

```bash
git clone https://github.com/Caleb-Besser/blog-api.git
cd blog-api
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=blog_api
DB_PASSWORD=your_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

4. Set up the database

Create a PostgreSQL database named `blog_api` and run the SQL commands in `schema.sql`:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

5. Start the server

```bash
node index.js
```

The server will run on `http://localhost:3000`

## API Endpoints

### Authentication

| Method | Endpoint           | Description                 | Auth Required |
| ------ | ------------------ | --------------------------- | ------------- |
| POST   | /api/auth/register | Create a new user account   | No            |
| POST   | /api/auth/login    | Login and receive JWT token | No            |

### Posts

| Method | Endpoint                | Description                         | Auth Required |
| ------ | ----------------------- | ----------------------------------- | ------------- |
| GET    | /api/posts              | Get all posts (supports pagination) | No            |
| GET    | /api/posts/search       | Search posts by keyword             | No            |
| GET    | /api/posts/:id          | Get a single post by ID             | Yes           |
| GET    | /api/posts/:id/comments | Get all comments for a post         | No            |
| POST   | /api/posts              | Create a new post                   | Yes           |
| PUT    | /api/posts/:id          | Update a post                       | Yes           |
| DELETE | /api/posts/:id          | Delete a post                       | Yes           |

### Comments

| Method | Endpoint          | Description                | Auth Required |
| ------ | ----------------- | -------------------------- | ------------- |
| POST   | /api/comments     | Create a comment on a post | Yes           |
| PUT    | /api/comments/:id | Update your own comment    | Yes           |
| DELETE | /api/comments/:id | Delete your own comment    | Yes           |

## Example Requests

### Register a New User

```json
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Login

```json
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

### Create a Post (Requires Authentication)

```json
POST /api/posts
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "title": "My First Blog Post",
  "content": "This is the content of my blog post."
}
```

### Get All Posts with Pagination

```
GET /api/posts?page=1&limit=10
```

### Search Posts

```
GET /api/posts/search?q=keyword
```

### Create a Comment (Requires Authentication)

```json
POST /api/comments
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "content": "Great post!",
  "post_id": 1
}
```

## Project Structure

```
blog-api/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   ├── authController.js   # Authentication logic
│   ├── postController.js   # Post operations
│   └── commentController.js # Comment operations
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── routes/
│   ├── authRoutes.js      # Authentication routes
│   ├── postRoutes.js      # Post routes
│   └── commentRoutes.js   # Comment routes
├── .env                   # Environment variables (not in repo)
├── .gitignore
├── index.js               # Application entry point
├── package.json
├── schema.sql             # Database schema
└── README.md
```

## Error Handling

The API returns appropriate HTTP status codes:

-   `200` - Success
-   `201` - Created
-   `400` - Bad Request (invalid input)
-   `401` - Unauthorized (missing or invalid token)
-   `403` - Forbidden (not authorized to perform action)
-   `404` - Not Found
-   `500` - Internal Server Error

## Security

-   Passwords are hashed using bcrypt before storage
-   JWT tokens expire after 24 hours
-   Protected routes require valid JWT authentication
-   Users can only modify their own comments

## Future Enhancements

-   Add user profiles
-   Implement post categories/tags
-   Add likes/reactions to posts
-   File upload support for images
-   Email verification for registration
-   Password reset functionality
-   Rate limiting to prevent abuse

## License

This project is open source and available under the MIT License.
