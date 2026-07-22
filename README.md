# CDocs Backend

Backend API for **CDocs**, a collaborative document editor built with Fastify, Prisma, and MySQL.

## Tech Stack

- Fastify
- TypeScript
- Prisma
- MySQL
- JWT Authentication
- Zod
- bcrypt

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file:

```env
DATABASE_URL="your_database_url"
JWT_SECRET="your_jwt_secret"
PORT=4000
```

### 3. Run database migrations

```bash
npx prisma migrate dev
```

### 4. Start the development server

```bash
npm run dev
```

The API will be available at:

```
http://localhost:4000
```

## Project Structure

```
src/
├── modules/
│   ├── auth/
│   ├── user/
│   └── document/
├── plugins/
├── prisma/
└── app.ts
```

## Available Features

- User registration
- User login with JWT
- Document creation
- Document deletion

## License

MIT
