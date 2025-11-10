# Blog website API

This is an example API for a blog website.

## Description

This API allows for posting blogs, and comments on them. It was made to help me learn back-end development.

## Technologies Used

-   Node.js
-   Express
-   PostgreSQL
-   JWT
-   bcrypt

## Setup Instructions

### Prerequisites

-   Node.js installed
-   PostgreSQL installed

### Installation

1. Clone the repository
   \`\`\`bash
   git clone https://github.com/Caleb-Besser/blog-api.git
   cd blog-api
   \`\`\`

2. Install dependencies
   \`\`\`bash
   npm install
   \`\`\`

3. Create a `.env` file in the root directory:
   \`\`\`
   DB_USER=postgres
   DB_HOST=localhost
   DB_DATABASE=blog_api
   DB_PASSWORD=your_password
   DB_PORT=5432
   JWT_SECRET=your_secret_key
   PORT=3000
   \`\`\`

4. Set up the database
   \`\`\`bash

# Create database in PostgreSQL

# Run schema.sql

\`\`\`

5. Start the server
   \`\`\`bash
   node index.js
   \`\`\`

## API Endpoints

### Authentication

| Method | Endpoint           | Description     | Auth Required |
| ------ | ------------------ | --------------- | ------------- |
| POST   | /api/auth/register | Create new user | No            |
| POST   | /api/auth/login    | Login user      | No            |

### Posts

| Method | Endpoint                | Description          | Auth Required |
| ------ | ----------------------- | -------------------- | ------------- |
| GET    | /api/posts              | Get all posts        | No            |
| GET    | /api/posts/:id          | Get single post      | Yes           |
| POST   | /api/posts              | Create post          | Yes           |
| PUT    | /api/posts/:id          | Update post          | Yes           |
| DELETE | /api/posts/:id          | Delete post          | Yes           |
| PUT    | /api/posts/:id/comments | Get comments on post | Yes           |

### Comments

| Method | Endpoint          | Description                 | Auth Required |
| ------ | ----------------- | --------------------------- | ------------- |
| POST   | /api/comments     | Create comment              | Yes           |
| PUT    | /api/comments/:id | Update comment (owner only) | Yes           |
| DELETE | /api/comments/:id | Delete comment (owner only) | Yes           |

### Example Request

\`\`\`json
POST /api/auth/register
{
"username": "john",
"email": "john@example.com",
"password": "password123"
}
\`\`\`

## Features

-   User authentication with JWT
-   Password hashing with bcrypt
-   RESTful API design
-   CRUD operations for blog posts and comments

## Future Improvements

-   Add pagination
-   Add search functionality
-   Deploy to production
