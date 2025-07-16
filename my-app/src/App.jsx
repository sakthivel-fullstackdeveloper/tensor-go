import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ForgotPassword from "./auth/ForgetPassword";
import Page12 from "./pages/Page12";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import ChatBot from "./components/ChatBot";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page12 />} />
        <Route path="/user" element={<Page1 />} />
        <Route path="/chat" element={<Page2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update" element={<ForgotPassword />} />
        <Route path="/room/:roomId/:username" element={<ChatBot />} />
      </Routes>
    </Router>
  );
}
