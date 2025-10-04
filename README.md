⚙️ Backend (NestJS)
🚀 Overview

This backend is built using NestJS + TypeORM + PostgreSQL, providing user registration, login, fetching, updating email, and deletion APIs.

🧰 Tech Stack

NestJS — Node.js framework
TypeORM — ORM for PostgreSQL
PostgreSQL — Database
bcrypt — Password hashing
JWT — Authentication (optional)
Jest — Unit testing


📦 Installation
cd backend
npm install


⚙️ Environment Setup

Create a .env file inside backend/ with:

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=yourpassword
DB_NAME=usersdb
JWT_SECRET=supersecretkey
PORT=5000


🗄️ Database Configuration

Your app.module.ts should already connect to PostgreSQL via TypeORM:

TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  synchronize: true, // disable in production
});


🚀 Run the Backend
Development
npm run start:dev

🧪 Testing
Run all tests:
npm run tes

🔗 API Endpoints
Method	Endpoint	Description
POST	/auth/register	Register new user
POST	/auth/login	  Login with email+pass
GET	    /users	          Get all users
GET	   /users/:id	      Get single user by ID
PATCH	/users/:id	  Update user email
DELETE	/users/:id	  Delete user




🎨 Frontend (Next.js)
🚀 Overview

A Next.js frontend that consumes the NestJS API.
Includes pages for:

Login / Register
View Users List
View User Details
Edit User Email

🧰 Tech Stack

Next.js — React Framework
Tailwind CSS — Styling
Axios — API Calls
React Hooks — State & form handling

📦 Installation
cd frontend
npm install

🚀 Run the Frontend
Development
npm run dev
