import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import Stock from "./pages/Stock";
import StockDetail from "./pages/StockDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Navigation from "./pages/Navigation";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import "./App.css";

export default function App() {
  const currentUser = JSON.parse(localStorage.getItem("@stockAppUser"));

  return (
    <div className="container-fluid p-0">
      <UserContextProvider>
        <Navigation currentUser={currentUser} />
        <Routes>
          {currentUser && <Route path="/" element={<Home />} />}
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
          {currentUser && <Route path="/stock" element={<Stock />} />}
          {currentUser && (
            <Route path="/stock/detail/:symbolID" element={<StockDetail />} />
          )}
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        {currentUser && <Footer />}
      </UserContextProvider>
    </div>
  );
}
