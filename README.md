# 🔗 SmartUrl – Simple URL Shortener

A minimal MERN stack (MongoDB, Express.js, React, Node.js) web app that lets users convert long URLs into short, shareable links.

## ✨ Features

- 🔗 Shortens long URLs into compact ones
- ⚡ Instant copy to clipboard
- 📱 Responsive and simple UI

## 🛠 Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Libraries**: nanoid, axios

## 📁 Folder Structure
url-shortner/
├── backend/
│ ├── models/
│ ├── routes/
│ └── server.js
├── frontend/
│ └── src/
│ └── App.jsx
└── .gitignore

## 🚀 Getting Started

### Prerequisites

- Node.js
- MongoDB installed locally or MongoDB Atlas

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/ShivamJuyal24/Url-Shortner.git
cd Url-Shortner

cd backend
npm install

## Create .env file
PORT=5000
MONGO_URI=your_mongodb_connection_string
BASE_URL=http://localhost:5000

Start the backend server:

bash
npm start
3️⃣ Frontend Setup
bash
cd ../frontend
npm install
Create a .env file:

ini
VITE_API_BASE_URL=http://localhost:5000
Run the frontend:

bash
npm run dev

```
## 🖼️ Screenshot
![URL Shortener Preview](./Screenshot%202025-07-23%20212152.png)

👤 Author
Shivam Juyal
GitHub: ShivamJuyal24
