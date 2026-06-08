import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {

  const navigate = useNavigate();

  const [user,setUser] = useState({
      username:"",
      email:"",
      password:""
  });

  const register = async () => {

      await api.post(
          "/auth/register",
          user
      );

      navigate("/");
  };

  return (

    <div className="auth-page">

      <div className="auth-card">

        <h1>Create Account</h1>

        <input
          placeholder="Username"
          onChange={(e)=>
            setUser({
                ...user,
                username:e.target.value
            })
          }
        />

        <input
          placeholder="Email"
          onChange={(e)=>
            setUser({
                ...user,
                email:e.target.value
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>
            setUser({
                ...user,
                password:e.target.value
            })
          }
        />

        <button onClick={register}>
          Register
        </button>

        <Link to="/">
          Back To Login
        </Link>

      </div>

    </div>
  );
}