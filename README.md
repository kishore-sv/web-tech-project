# Online Educational Resources Platform

A full-stack web application for sharing and managing educational PDF resources, built with Next.js, PostgreSQL, Drizzle ORM, ShadCN UI, and NextAuth.

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: NextAuth.js (Credentials Provider)
- **UI Components**: ShadCN UI & Tailwind CSS
- **File Storage**: Local filesystem (`/public/uploads`)

## Prerequisites

- [Bun](https://bun.sh/) installed
- PostgreSQL database

## Getting Started

### 1. Clone properties and Install Dependencies

```bash
bun install
```

### 2. Set Environment Variables

Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL=postgres://username:password@localhost:5432/database_name
AUTH_SECRET=your_nextauth_secret_here # Generate one: openssl rand -base64 32
```

### 3. Database Setup

Push the schema to your database:

```bash
bunx drizzle-kit push
```

### 4. Seed Admin User

Run the seed script to create an initial admin account:

```bash
bun scripts/seed.ts
```

**Admin Credentials:**
- **Email**: `admin@example.com`
- **Password**: `password123`

### 5. Create Upload Directory

Ensure the upload directory exists:

```bash
mkdir -p public/uploads
```

### 6. Run the Application

```bash
bun dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

## Features

- **User Auth**: Register and Login functionality.
- **Resource Upload**: Authenticated users can upload PDF files (max 5MB).
- **Approval System**: Admin must approve resources before they appear in the public gallery.
- **Dashboard**: Users can track their own uploads and their status.
- **Admin Panel**: Dedicated route for admins to approve/reject pending resources.
- **Filtering**: Browse resources by subject and search by title/description.

## Folder Structure

- `app/`: Next.js pages and API routes.
- `components/`: UI components (including ShadCN).
- `lib/`: Database schema, connection, and auth configuration.
- `scripts/`: Seeding and maintenance scripts.
- `public/uploads/`: Local storage for uploaded PDF files.
