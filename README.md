# 🚀 NoSQL Social Network API

## 📌 Description
This **NoSQL Social Network API** is built using **MongoDB**, **Express.js**, and **Mongoose**. It allows users to **share thoughts, react to friends' thoughts, and create a friend list**. The API follows a **RESTful architecture** and is tested using **Insomnia/Postman**.

This project demonstrates how to work with **MongoDB (NoSQL databases)** and **Mongoose ORM**, implementing **CRUD operations** for users, thoughts, reactions, and friendships.

---

## 📸 Walkthrough Video
🔗 **[Click here to watch the walkthrough video](YOUR_VIDEO_LINK_HERE)**  
_(Replace with your actual video link)_

---

## 🛠️ Technologies Used
- **Node.js** - Backend runtime
- **Express.js** - Web framework for handling routes
- **MongoDB** - NoSQL database for storing user and thought data
- **Mongoose** - ODM for MongoDB to manage schema
- **Insomnia/Postman** - API testing tool
- **Cors & Morgan** - Middleware for security and logging

---

## 🚀 Installation

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/nosql-social-network-api.git
cd nosql-social-network-api
```

### **2️⃣ Install Dependencies**
```bash
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a **`.env`** file in the root directory and add:
```
MONGO_URI=mongodb://127.0.0.1:27017/socialNetworkDB
```

### **4️⃣ Start the MongoDB Server**
Make sure **MongoDB** is running locally:
```bash
mongod
```

### **5️⃣ Start the API Server**
```bash
npm start
```
or use:
```bash
npm run dev
```
_(If using nodemon for live server reloads)_

---

## 📌 API Routes Documentation

### **📌 User Routes**
#### **🔹 Get All Users**
```http
GET /api/users
```
#### **🔹 Get a Single User (by ID)**
```http
GET /api/users/:id
```
#### **🔹 Create a New User**
```http
POST /api/users
```
📌 **Example JSON Body**
```json
{
  "username": "johndoe",
  "email": "johndoe@example.com"
}
```
#### **🔹 Update User (by ID)**
```http
PUT /api/users/:id
```
#### **🔹 Delete a User (by ID)**
```http
DELETE /api/users/:id
```
🛠 **Bonus**: Deleting a user also deletes associated thoughts.

---

### **📌 Thought Routes**
#### **🔹 Get All Thoughts**
```http
GET /api/thoughts
```
#### **🔹 Get a Single Thought (by ID)**
```http
GET /api/thoughts/:thoughtId
```
#### **🔹 Create a Thought**
```http
POST /api/thoughts
```
📌 **Example JSON Body**
```json
{
  "thoughtText": "This is my first thought!",
  "username": "johndoe",
  "userId": "replace-with-actual-user-id"
}
```
#### **🔹 Update a Thought**
```http
PUT /api/thoughts/:thoughtId
```
#### **🔹 Delete a Thought**
```http
DELETE /api/thoughts/:thoughtId
```

---

### **📌 Friend Routes**
#### **🔹 Add a Friend**
```http
POST /api/users/:userId/friends/:friendId
```
#### **🔹 Remove a Friend**
```http
DELETE /api/users/:userId/friends/:friendId
```

---

### **📌 Reaction Routes**
#### **🔹 Add a Reaction to a Thought**
```http
POST /api/thoughts/:thoughtId/reactions
```
📌 **Example JSON Body**
```json
{
  "reactionBody": "Great thought!",
  "username": "janedoe"
}
```
#### **🔹 Remove a Reaction**
```http
DELETE /api/thoughts/:thoughtId/reactions/:reactionId
```

---

## 🎥 Walkthrough Video (Required)
To complete the project, **record a walkthrough video** demonstrating:
✅ **Starting the server** (`npm start`)  
✅ **Testing all GET, POST, PUT, DELETE routes using Insomnia/Postman**  
✅ **Creating, updating, deleting users and thoughts**  
✅ **Adding and removing friends**  
✅ **Adding and deleting reactions**  

**Upload the video** and place the **link in the "Walkthrough Video" section** above.

---

## 📂 File Structure
```
📦 NoSQL-Social-Network-API
 ┣ 📂 config
 ┃ ┗ 📜 connection.js
 ┣ 📂 controllers
 ┃ ┣ 📜 thoughtController.js
 ┃ ┗ 📜 userController.js
 ┣ 📂 models
 ┃ ┣ 📜 Thought.js
 ┃ ┣ 📜 User.js
 ┃ ┗ 📜 Reaction.js
 ┣ 📂 routes
 ┃ ┣ 📜 thoughtRoutes.js
 ┃ ┗ 📜 userRoutes.js
 ┣ 📂 utils
 ┃ ┗ 📜 formatDate.js
 ┣ 📜 .gitignore
 ┣ 📜 package.json
 ┣ 📜 server.js
 ┗ 📜 README.md
```

---

## 🏆 Bonus Features
- ✅ **Cascade Delete**: When a user is deleted, their thoughts are also deleted.
- ✅ **Formatted Timestamps**: Dates are formatted using a helper function.
- ✅ **Uses Mongoose Virtuals**: `friendCount` and `reactionCount` are dynamically calculated.

---

## 🎯 Future Enhancements
- 🔹 **Authentication (JWT)**
- 🔹 **Front-End Integration**
- 🔹 **Pagination for Large Databases**

---

## 🛠️ Troubleshooting
### **MongoDB Not Running?**
Check if MongoDB is running:
```bash
mongod
```
If not installed, follow [this guide](https://coding-boot-camp.github.io/full-stack/mongodb/how-to-install-mongodb).

### **Port Conflict?**
If `3001` is in use, change it in `server.js`:
```javascript
const PORT = process.env.PORT || 5000;
```
Then restart the server:
```bash
npm start
```

---

## 📜 License
This project is **MIT licensed**.

---

### 🎯 **🚀 Congratulations! Your Social Network API is Ready for Submission!** 🎯
Let me know if you need **any last-minute help!** 😊🔥
