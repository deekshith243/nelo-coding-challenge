# Nelo Coding Challenge

This project is a Task Management application built as part of the Nelo Internship Coding Assessment.

## ✅ Features Implemented

### 🔐 Authentication
- Login screen
- Session stored using sessionStorage
- Session persists on refresh
- Session resets when tab is closed
- Logout functionality

### ✅ Task Management
- Create tasks with:
  - Title
  - Description
  - Priority (High / Medium / Low)
  - Due date
- Edit existing tasks
- Delete tasks with confirmation
- Mark tasks as Completed or Pending

### ✅ Filtering & Search
- Filter by:
  - All
  - Completed
  - Pending
  - Priority
- Search tasks with debouncing (Elastic-style)
- Case-insensitive matching

### ✅ Automation Logging (Mock Mail System)
- Background interval check
- Logs pending task reminders in Console
- Shows due date in log output

### ✅ UI / UX
- Built with React + Tailwind CSS
- Responsive layout
- Clean professional look

## 📦 Tech Stack
- React
- Tailwind CSS
- sessionStorage (for auth persistence)

## ▶️ How to Run
```bash
npm install
npm start
