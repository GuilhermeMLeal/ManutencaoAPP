"use client";
import { AuthProvider } from "@/AuthContext";
import Index from "./pages/index/page";
import Login from "./pages/login/page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "@/PrivateRoute";

export default function Home() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/"
          element={<PrivateRoute component={Index}/>} />

          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
