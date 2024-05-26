import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { UserContext } from "../context/userContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleLogin(e) {
    try {
      e.preventDefault();
      let response = await fetch(
        "https://blog-backend-qlco.onrender.com/api/auth/login",
        {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      response = await response.json();
      console.log(response.msg);

      if (response.success) {
        message.success(response.msg);
        localStorage.setItem("token", response.token);
        localStorage.setItem("id", response.existingUser._id);
        navigate("/");
        setUserInfo(response.existingUser);
      } else {
        message.error(response.msg);
      }
    } catch (err) {
      message.error(err.msg);
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h1 className="login">Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>
    </form>
  );
};

export default Login;
