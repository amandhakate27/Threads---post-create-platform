# Thread App

A simple **Express.js** web app that lets users create, view, edit, and delete discussion threads. It also supports image uploads using **Multer**.

---

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the server**

   ```bash
   nodemon index.js
   ```

3. **Visit in browser**

   ```
   http://localhost:3000/threads
   ```

---

## Packages Used

- express
- ejs
- multer
- method-override
- uuid
- path
- nodemon

---

## Folder Structure

```
thread-app/
│
├── public/
│   ├── assets/
│   ├── uploads/
│   ├── css/
│   └── js/
│
├── views/
│   ├── index.ejs
│   ├── new.ejs
│   ├── edit.ejs
│   ├── show.ejs
│   └── 404.ejs
│
├── server.js
├── package.json
└── README.md
```

---

## Routes

---

| Route               | Method | Description                 |
| ------------------- | ------ | --------------------------- |
| `/threads`          | GET    | View all threads            |
| `/threads/new`      | GET    | Form to create a new thread |
| `/threads`          | POST   | Add a new thread            |
| `/threads/:id`      | GET    | View a specific thread      |
| `/threads/:id/edit` | GET    | Edit a thread               |
| `/threads/:id`      | PATCH  | Update thread               |
| `/threads/:id`      | DELETE | Delete a thread             |

---

## Screenshots

### Home Page / All Threads

![Home Page / All Threads](./home%20page.png)

### New Thread Page

![Create New Thread](./create%20new%20thread.png)

### Edit Thread

![Edit Thread](./edit%20page.png)

### 404 Page Not Found

![404 Page](./page%20not%20found.png)

## Live Demo

🔗 **Check it out here:** [Thread App on Render](https://your-app-name.onrender.com)

**Author:** @amandhakate27
