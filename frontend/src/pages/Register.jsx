import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Auth.css";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/register", {
  name,
  email,
  password,
});

  alert("Registration Successful!");

console.log(response.data);

setName("");
setEmail("");
setPassword("");

navigate("/");
    } catch (error) {
  console.error(error);

  console.log("Status:", error.response?.status);
  console.log("Data:", error.response?.data);

  alert(JSON.stringify(error.response?.data));
    }
  };

  return (
  <div className="auth-container">
    <div className="auth-card">

      <div className="logo">💰</div>

      <h1>Create Account</h1>

      <p className="subtitle">
        Join your Personal Finance Tracker
      </p>

      <form onSubmit={handleRegister}>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Register
        </button>

      </form>

      <p className="bottom-text">
        Already have an account?{" "}
        <Link to="/">Login</Link>
      </p>

    </div>
  </div>
);
}

export default Register;