import React, { useContext, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "./login.css";
import { Context } from "../context/Context";
const Login = () => {
  const { setusername, fetchtodos } = useContext(Context);
  const navigate = useNavigate();

  const [login, setlogin] = useState({
    email: "",
    password: "",
  });

  const handleinput = (e) => {
    setlogin({ ...login, [e.target.name]: e.target.value });
  };
  const submit = async () => {
    const response = await fetch(
      `https://mern-todo-app-4t4v.onrender.com/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      }
    );
    const res = await response.json();

    const token = res.AtuhToken;

    if (response.ok) {
      localStorage.setItem("token", token);
      navigate("/");
      fetchtodos();
      setusername(res.user.name);
      toast.success(`🦄 ${res.message} !`, {
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
      toast.warn(`🦄 ${"error somthing went wrong. Please try again"} !`, {
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
    //   setLogin(credentials)

    // setlogin(initial)
  };
  return (
    <div className="rounded-md flex flex-col justify-center gap-4 bg-slate-600 w-2/3 items-center mx-auto my-5 h-[300px]">
      <h1>Login </h1>

      <input
        className="w[60%] p-4"
        type="text"
        name="email"
        id="username"
        onChange={handleinput}
        value={login.username}
        required
      />
      <input
        className="w[60%] p-4"
        type="text"
        name="password"
        id="password"
        onChange={handleinput}
        value={login.password}
        required
      />
      <button className="w[15%] p[15px]" onClick={submit}>
        submit
      </button>
      <Link to="/register">
        <p>don't have an account</p>
      </Link>
    </div>
  );
};

export default Login;
