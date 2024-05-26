import { message } from "antd";
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  async function profile() {
    try {
      await fetch("https://blog-backend-qlco.onrender.com/api/auth/profile", {
        method: "GET",
        credentials: "include",
      });
      //   response = await response.json();
      setUserInfo(userInfo);
    } catch (error) {
      message.error("Internal Server Error");
    }
  }

  useEffect(() => {
    profile();
  });

  const token = localStorage.getItem("token");

  async function handleLogout(e) {
    try {
      e.preventDefault();
      let response = await fetch(
        "https://blog-backend-qlco.onrender.com/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
      response = await response.json();
      message.success(response.msg);
      setUserInfo(null);
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("chat-user");
      navigate("/login");
    } catch (error) {
      message.error("Internal Server Error");
    }
  }

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {token && (
          <>
            <Link to="/create">Create Post</Link>
            <Link onClick={handleLogout}>Logout</Link>
          </>
        )}
        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
