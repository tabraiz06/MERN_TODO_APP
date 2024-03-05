import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
const Register = () => {
  const { setusername } = useContext(Context);
  const navigate = useNavigate();
  const initialValue = {
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  };
  const [register, setregister] = useState(initialValue);

  const handleChange = (e) => {
    setregister({ ...register, [e.target.name]: e.target.value });
  };
  // console.table(register)
  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://mern-todo-app-4t4v.onrender.com/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(register),
      }
    );
    const result = await response.json();

    const token = result.AuthToken;

    if (token) {
      localStorage.setItem("token", token);
      navigate("/");

      setusername(result.user.name);
      toast.success(`🦄 ${result.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.warn(`🦄 ${"error something is wrong. Please try again"} !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="main">
      <h1>Register now</h1>
      <form action="">
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="mobile number"
          onChange={handleChange}
          aria-required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
          required
        />
        <button onClick={handleRegister}>Submit</button>
      </form>
      <Link to="/login">have an account</Link>
    </div>
  );
};

export default Register;
