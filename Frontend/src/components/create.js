import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Create() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // email validation
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // phone number validation
  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  // form validation (if any wrong input)
  const validateForm = () => {
    let errors = {};

    if (!name.trim()) errors.name = "Full Name is required";
    if (!validateEmail(email)) errors.email = "Enter a valid Email";
    if (!validatePhone(phone)) errors.phone = "Enter a valid 10-digit Phone number";
    if (password.length < 6 || password.includes(" ")) errors.password = "Password must be at least 6 characters";

    setErrors(errors);
    return Object.keys(errors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Disables submission if validation fails

    const userData = { name, phone, email, password };

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
    
      const data = await response.json();
      console.log("Response:", data.message);

      if (response.ok) {
        navigate("/"); // navigates to login page on successful signup
      } else {
        console.error("Signup failed:", data.message);
      }

    } catch (error) {
      console.error("Error signing up:", error);
    }
};

  return (
    <div className='loginbody'>
      <div>
        <img
          src="https://cdn.dribbble.com/userupload/24439185/file/original-2c9b06bf14c1c8732d59221e3c498f9f.gif"
          alt="Create Account Animation"
        />
      </div>
      <div>
        <div className="container">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="error">{errors.name}</p>}

            <input
              type="text"
              placeholder="Phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <p className="error">{errors.phone}</p>}

            <input
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password}</p>}

            <a href="/">Login</a>
            <button type="submit">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}