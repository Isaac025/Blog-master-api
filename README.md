# Blog Master REST API Project Description

The --Blog Master-- project is a RESTful API designed to manage blog content efficiently. The project structure is organized into multiple files and folders, each serving a specific purpose:

--Controllers: Handles the logic for blog operations such as creating, reading, updating, and deleting posts and comments Also contains registerUser and loginUser function for handling authentication (user registration, user login e.t.c)
--Models: Define the data schemas for users, posts, and comments, ensuring data consistency and validation
--Routes: Link HTTP requests to their respective controller methods to deliver the blog’s functionalities
--Middleware: Manage authentication, authorization, and error handling to ensure security and prevent unauthorized access

\*\*index.js: contains the connectDB function to connect to database, contains middleware such as app.use(express.json()) which is used to parse a body is JSON format and app.use(cors()) to allow the frontend access the backend api

# Installation & setup instructions

npm install (to install packages)

1. express – Web framework for Node.js
2. mongoose – MongoDB object modeling
3. jsonwebtoken – Authentication via JWT
4. bcryptjs – Password hashing
5. cors – Enable cross-origin requests
6. dotenv – Environment variable management
7. nodemon (devDependency) -

npm run dev -- to start the server or nodemon index.js
postman - To test the Api
.env - environmental variables
index.js - App entry point

# API Endpoint list

POST /api/blog/add -- addBlog -- auth required(isLoggedIn, requiredPermissions("admin"))
GET /api/blog/all -- getAllBlogs -- auth required(isLoggedIn)
GET /api/blog/:id -- getBlogById -- auth required(isLoggedIn)
DELETE /api/blog/:id -- deleteBlogById -- auth required(isLoggedIn, requiredPermissions("admin"))
PATCH /api/blog/:id -- togglePublish -- auth required(isLoggedIn, requiredPermissions("admin"))

(user login and registration)
POST /api/auth/login -- loginUser
POST /api/auth/register -- registerUser

# Authentication and role-based access explanation

Authentication ensures that only registered users can access certain parts of the API.
In this project, authentication is implemented using JSON Web Tokens (JWT):
1. User registers or logs in by providing valid credentials.
2. On successful login, the server generates a JWT signed with a secret key.
3. The client stores this token (usually in localStorage).
4. The server verifies the token before processing a request
# Authroization (Role Based Access)
1. Each user has a role (e.g user, admin)
2. Roles are assigned during registration
3. Protected routes check both:
    ..If the user is authenticated (has a valid token).
    ..If the user’s role has permission to perform the action.

For example, 
1. A user can Read Blog posts
2. can see all blog post created by the admin

An Admin can: 
1. Do Everything a user can
2. Delete a post and publish / unpublish post
3. create blog post
