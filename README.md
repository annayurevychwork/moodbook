# 🌿 Moodbook

Moodbook is a privacy-first, mental health and mood-tracking social feed. Designed as a safe space for users to share life updates, track their emotional well-being, and connect with a supportive community. 

This project was built to demonstrate advanced frontend architecture, including complex Redux state management, data visualization, internationalization (i18n), and strict accessibility (a11y) standards.

## 🚀 Key Features & Functionality

### 1. Privacy-First Data Flow (Public vs. Private Journal)
Users can control the visibility of their content. This is managed via dynamic Redux filtering:
* 🌐 **Public:** Visible to everyone on the global feed.
* 🔒 **Private Journal:** Safely hidden from the public feed. These entries are strictly rendered only for the author, allowing them to use the app as a personal mood diary.
![Main Feed & Privacy](screenshots./main.png)

### 2. Mood Tracking & Creation
A specialized post-creation form where users must attach a "Mood" to their update. This bridges the gap between a standard social feed and a health-tracking application.
![Mood Selector](screenshots./mood.png)

### 3. Dynamic Filtering & Sorting
The global feed features a robust, two-tier filtering system:
* **Search by Author:** Instantly filters the Redux store to find specific community members.
* **Sort Logic:** Users can reorganize the feed by *Newest*, *Oldest*, or most *Popular* (highest likes).

### 4. Interactive User Dashboard & Analytics
Users have full control over their identity. Profile updates (Name, Avatar) are managed in a `userSlice` and globally reflected across all past and future posts. 
Additionally, a custom `recharts` integration analyzes the user's post history to generate a real-time **Mood Analytics Bar Chart**, providing visual insight into their emotional trends.
![Profile & Analytics Dashboard](screenshots./profile.png)

### 5. Internationalization (i18n)
Built for a global audience, the application features seamless, on-the-fly language switching between English and Ukrainian using `react-i18next`. All form placeholders, modal text, and dynamic chart labels translate instantly without a page reload.
![Ukrainian Translation](screenshots./ua.png)

### 6. Engaging Interactions & Routing
* **Likes & Comments:** Fully functional interactive elements managed asynchronously via Redux Toolkit.
![Likes and Comments](screenshots./likecomment.png)
* **Single Post View:** Clickable post cards utilize React Router to isolate single interactions, rendering dedicated `/post/:id` pages.
![Single Post View](screenshots./onepost.png)

### 7. Accessibility (a11y) & Performance
* Fully navigable via `Tab` and `Enter` keys.
* Includes a custom, fully accessible "Delete Post" modal featuring focus trapping and escape-key listeners to meet WCAG standards.
* Optimized with `React.memo` to prevent unnecessary re-renders during feed interactions, and `React.lazy` for route code-splitting.

## 🛠️ Tech Stack
* **Framework:** React (Vite)
* **State Management:** Redux Toolkit (RTK)
* **Routing:** React Router v6
* **Styling:** Tailwind CSS
* **Data Visualization:** Recharts
* **Internationalization:** i18next & react-i18next
* **Icons:** Lucide React
* **Date Formatting:** date-fns