import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TaskPage from "./pages/TaskPage";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/tasks" /> : <LoginPage />}
        />
        <Route
          path="/tasks"
          element={isLoggedIn ? <TaskPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;