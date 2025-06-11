import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Account created successfully!", {
            position: "top-right",
            style: {
              marginTop: "100px",
              background: "#4CAF50",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              borderRadius: "8px",
            },
            icon: "🎉",
            autoClose: 3000,
            hideProgressBar: false,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
        } else {
          toast.error(response.data.message, {
            position: "top-right",
            style: {
              marginTop: "100px",
              background: "#4CAF50",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              borderRadius: "8px",
            },
            icon: "⚠️",
            autoClose: 3000,
            hideProgressBar: false,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Logged in successfully!", {
            position: "top-right",
            style: {
              marginTop: "100px",
              background: "#4CAF50",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              borderRadius: "8px",
            },
            icon: "✅",
            autoClose: 3000,
            hideProgressBar: false,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
        } else {
          toast.error(response.data.message, {
            position: "top-right",
            style: {
              marginTop: "80px",
              background: "#4CAF50",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              borderRadius: "8px",
            },
            icon: "⚠️",
            autoClose: 3000,
            hideProgressBar: false,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "top-right",
        style: {
          marginTop: "80px",
          background: "#ff4d4d",
          color: "white",
          fontWeight: "bold",
          fontSize: "16px",
          borderRadius: "8px",
        },
        icon: "❌",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-md m-auto mt-16 gap-6 bg-white p-10 rounded-2xl shadow-2xl text-gray-800 mb-32"
    >
      <div className="flex flex-col items-center gap-2 mb-6">
        <p className="text-4xl font-extrabold text-green-500">{currentState}</p>
      </div>

      {currentState === "Sign Up" && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your name"
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter your email"
        required
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter your password"
        required
      />

      <div className="w-full flex justify-between text-xs text-gray-600 mt-[-2px]">
        <p className="cursor-pointer hover:underline hover:text-green-500 transition">
          Forgot password?
        </p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer hover:underline hover:text-blue-500 transition"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer hover:underline hover:text-blue-500 transition"
          >
            Login here
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 mt-6 rounded-lg transition duration-300"
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
