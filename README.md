# 🚀 Rate My Ship https://rate-my-ship.onrender.com

![Screenshot 1](./Screenshot%202026-01-23%20025135.png)
![Screenshot 2](./Screenshot%202026-01-23%20025149.png)

## 📌 Purpose / Problem Statement

Hackathon participants and indie builders ship projects very fast, but getting **honest technical and product feedback** is difficult.  

**Rate My Ship** solves this by:

- Allowing users to submit their projects  
- Getting AI-powered ratings & detailed feedback  
- Improving product quality before real users see it  

**In short:**  
👉 “Ship fast, but ship smart.”

---

## 🎯 What Rate My Ship Does

- 🔐 **Secure authentication** using Google OAuth  
- 🧠 **AI-based project evaluation** (UX, Idea, Tech, Scalability)  
- ⭐ **Ratings + detailed feedback**  
- 👤 **Role-based access** (User / Moderator)  
- ⚡ **Fast, scalable, production-ready web app**

---

## 🧑‍💻 Tech Stack

### Frontend
- **React (Vite)** – fast development & optimized build  
- **JavaScript (ES6+)**  
- **CSS / Tailwind**

### Backend / BaaS
- **Supabase**
  - Authentication (Google OAuth)  
  - PostgreSQL database  
  - Role-based access  
  - Secure APIs

---

## ⚡ Performance & Scalability

- **Vite** ensures fast load times & optimized builds  
- **Supabase** handles authentication, database, and scaling  
- **Stateless frontend** allows easy horizontal scaling  
- **CDN-based assets** for performance

---

## 🌍 Deployment

1. Push code to **GitHub**  
2. Connect the repository to **Render**  
3. Set:  
   - Build command: `npm install && npm run build`  
   - Publish directory: `dist`  
4. Add **environment variables** (see below)  
5. Deploy 🎉

---

## 🌍 How to Use

1. Fork the current **Repository**  
2. Run it **Locally**   
3. Install the require **packages** 
4. Create the **.env** file.

---

## 🔑 Environment Variables

Frontend (`.env`):

```env
VITE_SUPABASE_URL=https://xxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
