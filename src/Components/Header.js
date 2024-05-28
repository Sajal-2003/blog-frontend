import { message } from "antd";
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";

const Header = () => {
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  async function profile() {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/auth/profile",
        {
          withCredentials: true,
        }
      );
      setUserInfo(res.data);
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
      let response = await axios.post(
        "http://localhost:8000/api/auth/logout",
        {
          withCredentials: true,
        }
      );

      message.success(response.data.msg);
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
