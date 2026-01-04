import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Navbar1 from "./components/Navbar1";
import Footer from "./components/Footer";

import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import UpdateProfile from "./components/UpdateProfile";
import CreatePost from "./components/CreatePost";

import Feed from "./Pages/Feed";
import Followers from "./Pages/Followers";
import Following from "./Pages/Following";
import UserProfile from "./components/UserProfile";

import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import AboutUs from "./Pages/Aboutus";
import ContactUs from "./Pages/Contactus";
import SearchPage from "./Pages/SearchPage";

import ChatLayout from "./components/ChatLayout";
import ChatWindow from "./components/ChatWindow";
import EmptyChat from "./components/EmptyChat";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />

      <Navbar />
      <Navbar1 />

      <main className="flex-grow">
        <Routes>
          
          {/* AUTH */}
          <Route path="/register" element={<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4"> <Register /> </div>} />
          <Route path="/" element={<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4"> <Register /> </div>} />
          <Route path="/login" element={ <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4"> <Login /> </div>} />

          {/* MAIN */}
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/userprofile/:id" element={<UserProfile />} />

          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />

          <Route path="/followers/:id" element={<Followers />} />
          <Route path="/following/:id" element={<Following />} />

          <Route path="/search" element={<SearchPage />} />

          {/* PASSWORD */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* STATIC */}
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />

          {/* 💬 CHAT (WHATSAPP STYLE) */}
          <Route path="/messages" element={<ChatLayout />}>
            <Route index element={<EmptyChat />} />
            <Route path=":conversationId" element={<ChatWindow />} />
          </Route>
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
