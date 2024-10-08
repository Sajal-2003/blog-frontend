import { message } from "antd";
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  async function profile() {
    try {
      const res = await axios.get("http://localhost:8000/api/auth/profile", {
        withCredentials: true,
      });
      setUserInfo(res.data);
    } catch (error) {
      message.error("Internal Server Error");
    }
  }

  useEffect(() => {
    profile();
    // eslint-disable-next-line
  }, []);

  async function handleLogout(e) {
    try {
      e.preventDefault();
      let response = await axios.post("http://localhost:8000/api/auth/logout", {
        withCredentials: true,
      });

      message.success(response.data.msg);
      setUserInfo(null);

      navigate("/login");
    } catch (error) {
      message.error("Internal Server Error");
    }
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create Post</Link>
            <Link onClick={handleLogout}>Logout</Link>
          </>
        )}
        {!username && (
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
