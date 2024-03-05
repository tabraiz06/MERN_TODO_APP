import { createContext, useEffect, useState } from "react";

export const Context = createContext();

const ContextApi = ({ children }) => {
  const [username, setusername] = useState("");

  const [maintask, setmaintask] = useState([]);
  useEffect(() => {});
  const fetchtodos = async () => {
    const response = await fetch(
      `https://mern-todo-app-4t4v.onrender.com/api/fetchtodos`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          AuthToken: localStorage.getItem("token"),
        },
      }
    );
    const result = await response.json();

    if (response.status === 200) {
      setmaintask(result);
    }
  };
  useEffect(() => {
    fetchtodos();
  }, []);
  //

  return (
    <Context.Provider
      value={{ maintask, setmaintask, fetchtodos, setusername, username }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextApi;
