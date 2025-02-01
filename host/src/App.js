import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ReactDOM from "react-dom";

// Lazy load components
const ChatApp = React.lazy(() => import("chat/ChatApp"));
const EmailApp = React.lazy(() => import("email/EmailApp"));

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Welcome to the Main Application</h1>
          <nav className="nav-links">
            <Link to="/chat">Go to Chat App</Link>
            <Link to="/email">Go to Email App</Link>
          </nav>
        </header>

        <main>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/chat" element={<div className="chat-container"><h2>Chat Application</h2><ChatApp /></div>} />
              <Route path="/email" element={<div className="email-container"><h2>Email Application</h2><EmailApp /></div>} />
              <Route path="/" element={<div className="welcome-container"><h2>Select an app to load</h2></div>} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
