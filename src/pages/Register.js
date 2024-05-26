import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const response = await axios.post(
        "https://blog-backend-qlco.onrender.com/api/auth/register",
        { username, password }
      );

      console.log(response);

      if (response.request.status === 201) {
        message.success(response.data.msg);
        navigate("/login");
      }
    } catch (error) {
      message.error(error.response.data.msg);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="register">Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        autoComplete="false"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Register</button>
    </form>
  );
};

export default Register;
