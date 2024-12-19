import axios from "axios";
import React, { useState } from "react";
import axios from "axios";

const LoginModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter data based on the form type
    const dataToSend = isLogin
      ? { email: formData.email, password: formData.password }
      : formData;

    const endpoint = isLogin ? "/api/login" : "/api/signup";

    try {
      const response = await axios.post(`http://localhost:5000${endpoint}`, dataToSend);
      alert(response.data.message);
      if (isLogin) onClose(); // Close modal after successful login
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="modal-backdrop d-flex justify-content-center align-items-center">
      <div className="login-modal p-4">
        <div className="toggle-buttons d-flex justify-content-around mb-4">
          <button
            className={`toggle-btn ${isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>

          <button
            className={`toggle-btn ${!isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>
        <h5 className="text-center">{isLogin ? "Login" : "Sign Up"}</h5>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {!isLogin && (
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-primary">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
