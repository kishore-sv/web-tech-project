# Project: Online Educational Resources Platform

Build a full-stack web application using:

- Next.js (App Router)
- PostgreSQL
- Drizzle ORM
- ShadCN UI
- Tailwind CSS
- NextAuth (Credentials Provider)
- bcrypt for password hashing
- Local file storage in /public/uploads

The project must be minimal, clean, and properly structured.

Do NOT overengineer.

---

## Core Features

1. User Registration and Login
2. Upload PDF resources (max 5MB)
3. View and download approved resources
4. Subject-based filtering
5. Admin approval system

Only allow PDF uploads.
Validate file type and file size on server side.

---

## Database Design (Drizzle Schema)

Use PostgreSQL with Drizzle ORM.

Create the following tables:

### users
- id (uuid, primary key, default random)
- name (varchar)
- email (varchar, unique)
- password (text, hashed)
- role (enum: "USER", "ADMIN")
- created_at (timestamp, default now)

### resources
- id (uuid, primary key, default random)
- title (varchar)
- description (text)
- subject (varchar)
- file_url (text)
- status (enum: "PENDING", "APPROVED")
- uploaded_by (uuid, foreign key -> users.id, cascade delete)
- created_at (timestamp, default now)

Use proper relations in Drizzle.

---

## Required Folder Structure

app/
  page.tsx
  login/page.tsx
  register/page.tsx
  dashboard/page.tsx
  upload/page.tsx
  resources/page.tsx
  admin/page.tsx

app/api/
  auth/[...nextauth]/route.ts
  upload/route.ts
  resources/route.ts
  admin/approve/route.ts

lib/
  db.ts
  schema.ts
  auth.ts

components/
  Navbar.tsx
  ResourceCard.tsx
  UploadForm.tsx

middleware.ts

public/uploads/

---

## Authentication

Use NextAuth Credentials Provider.

- Hash passwords using bcrypt.
- Store session in JWT.
- Protect:
  - /dashboard
  - /upload
  - /admin

Only ADMIN role can access /admin.

Create a seed function to insert one ADMIN user.

---

## API Requirements

Upload Route:
- Validate authentication
- Validate file type (application/pdf)
- Validate max 5MB
- Save file to /public/uploads
- Insert metadata in database with status = "PENDING"

Resources Route:
- Return only APPROVED resources for normal users
- Admin can fetch all resources

Admin Approve Route:
- Only ADMIN allowed
- Update status to APPROVED

---

## UI Requirements (Use ShadCN Components)

Use:
- Card
- Button
- Input
- Label
- Textarea
- Select
- Badge
- Table

Keep UI minimal and clean.

Pages:

Home:
- Title
- Description
- Login/Register buttons
- View Resources button

Dashboard:
- Welcome message
- List of user uploads

Upload:
- Form with Title, Description, Subject, File upload

Resources:
- Search input
- Subject filter
- ResourceCard grid

Admin:
- Table of pending uploads
- Approve button

---

## Technical Requirements

- Use Drizzle with PostgreSQL driver
- Use environment variables for DATABASE_URL
- Use server components where possible
- Use route handlers for API
- Use middleware for route protection
- Avoid unnecessary third-party libraries

---

## Deliverables

Generate:

1. Drizzle schema
2. Database connection setup
3. Auth configuration
4. Middleware
5. All route handlers
6. Basic ShadCN UI usage
7. Seed script for ADMIN
8. README with setup instructions

Keep code modular and clean.
No extra features.
No AI features.
No cloud storage.
Minimal but complete.
