# FitTrack AI - Full Stack Deployment Guide

Welcome to FitTrack AI! This project demonstrates how to build and deploy a full-stack application using React, Spring Boot, PostgreSQL, and the Google Gemini API.

## Project Structure
- `frontend/` - React, Vite, Tailwind CSS, TypeScript
- `backend/` - Spring Boot, Java 17, Spring Security, JPA

## 1. Local Development

### Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL installed locally and running on port 5432

### Setup Backend
1. Open `backend/.env` and ensure `DATABASE_PASSWORD` matches your local postgres password. Also add your `GEMINI_API_KEY`.
2. Run the backend:
```bash
cd backend
./mvnw spring-boot:run
```
*(The backend runs on `http://localhost:8080`. Demo data will be inserted automatically on the first run.)*

### Setup Frontend
1. Open a new terminal.
2. Install dependencies and run:
```bash
cd frontend
npm install
npm run dev
```
*(The frontend runs on `http://localhost:5173`)*

3. Go to `http://localhost:5173` in your browser. You can login with `demo@fittrack.ai` / `demo123` or register a new account.

---

## 2. Production Deployment Guide

This section explains how to take this application from localhost to the real internet.

### Step 1: Deploy PostgreSQL Database
You need a cloud PostgreSQL database.
1. Go to [Render](https://render.com) or [Supabase](https://supabase.com).
2. Create a new PostgreSQL Database.
3. Once created, copy the **External Database URL**. It will look like:
   `postgresql://username:password@hostname:5432/dbname`

### Step 2: Deploy Spring Boot Backend (Render)
We will deploy the backend to Render.com.
1. Push your code to a GitHub repository.
2. Go to Render Dashboard -> New -> Web Service.
3. Connect your GitHub repository.
4. Settings:
   - **Environment:** Java
   - **Build Command:** `./mvnw clean package -DskipTests`
   - **Start Command:** `java -jar target/backend-0.0.1-SNAPSHOT.jar`
5. **Environment Variables:** Add these carefully!
   - `DATABASE_URL`: `jdbc:<Your External Database URL>` *(Ensure it starts with jdbc:postgresql://)*
   - `DATABASE_USERNAME`: *(Your cloud DB username)*
   - `DATABASE_PASSWORD`: *(Your cloud DB password)*
   - `JWT_SECRET`: *(Generate a long random string)*
   - `GEMINI_API_KEY`: *(Your Google Gemini API Key)*
   - `FRONTEND_URL`: *(Leave blank for now, update after deploying frontend)*
6. Click **Deploy**. Once it's live, copy the backend URL (e.g., `https://fittrack-backend.onrender.com`).

### Step 3: Deploy React Frontend (Netlify)
We will deploy the frontend to Netlify.
1. Go to [Netlify](https://netlify.com).
2. Add New Site -> Import from existing repository (GitHub).
3. Select your repository. Base directory: `frontend`.
4. Settings:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
5. **Environment Variables:**
   - `VITE_API_BASE_URL`: `https://fittrack-backend.onrender.com/api` *(Your Render backend URL + /api)*
6. Click **Deploy**. Once it's live, copy the frontend URL (e.g., `https://fittrack-frontend.netlify.app`).

### Step 4: Finalize CORS
1. Go back to your Render Backend settings.
2. Update the `FRONTEND_URL` environment variable to your Netlify URL (e.g., `https://fittrack-frontend.netlify.app`).
3. Render will restart your backend.

**Congratulations! Your full-stack application is live!**

---

## What to check when deployment doesn't work

- **Frontend cannot reach backend:** 
  Check the browser console. If requests go to `localhost`, you didn't set `VITE_API_BASE_URL` in Netlify properly.
- **CORS Error:**
  If you see "Blocked by CORS policy" in the browser console, the backend `FRONTEND_URL` doesn't exactly match your Netlify URL (make sure there is no trailing slash).
- **Database Connection Error:**
  Check Render backend logs. If you see connection refused, ensure your `DATABASE_URL` starts with `jdbc:postgresql://`.
- **Backend crashes on startup:**
  Check if `PORT` is being injected by Render (it is by default). Ensure you didn't hardcode `8080` in Java.
- **AI features not working:**
  Check if `GEMINI_API_KEY` is set in the backend environment variables.
