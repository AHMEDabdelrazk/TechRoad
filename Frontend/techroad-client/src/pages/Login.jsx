import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import "../styles/components.css";
import "../styles/login.css";

export default function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const login = async () => {

    try {

      const response = await api.post("auth/login",{
        email,
        password
      });

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      navigate("/dashboard");

    } catch {

      alert("Invalid Credentials");

    }
  };

  return (

<div className="auth-page">

    <div className="auth-card">

        <h1>
            TechRoad
        </h1>

        <p>
            Build your learning roadmap
        </p>

        <input
            placeholder="Email"
            onChange={(e)=>
                setEmail(e.target.value)
            }
        />

        <input
            type="password"
            placeholder="Password"
            onChange={(e)=>
                setPassword(e.target.value)
            }
        />

        <button
            onClick={login}
        >
            Login
        </button>

        <Link to="/register">
            Create Account
        </Link>

    </div>

</div>

);
}