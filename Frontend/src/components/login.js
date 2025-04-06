import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isEmail = (input) => /\S+@\S+\.\S+/.test(input);
    const isPhone = (input) => /^\d{10}$/.test(input);

    const handleShowPasswordToggle = () => {
      setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
      setIsSubmitting(true);
      e.preventDefault();

      if (!isEmail(identifier) && !isPhone(identifier)) {
          setError("Please enter a valid email or phone number");
          setIsSubmitting(false);
          return;
      }

      const loginType = isEmail(identifier) ? "email" : "phone";

      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, { loginType, identifier, password }, { withCredentials: true });
        const data = response.data
        if (data){
            navigate('/');  // Redirect to home
        } else {
            setError(data.message);
        }
      } catch (error) {
        // console.error("Login failed", error);
        setError("Invalid Credentials")
      } finally {
          setIsSubmitting(false);
      }

    };

  return (
      <div className="loginbody">
        <div className="left-side">
            {/* <img src="your-logo.svg" alt="Logo" /> */}
            <h1>Annadata</h1>
            <h1 style={{ position: 'relative', marginLeft: '2vw', marginTop: '1vh' }}>अन्नदाता</h1>
            <p>Sign in to continue to our platform.</p>
        </div>
        <div className="right-side">
            <h2 style={{ marginBottom: "10vh" }}>Login</h2>
            <form onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                type="text"
                id="username"
                placeholder="Enter Email or Phone Number"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                aria-label="Username"
                />
                <i className="fa fa-user"></i>
            </div>
            <div className="input-group password-input-group">
                <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Password"
                />
                <button
                type="button"
                className="show-password-toggle"
                onClick={handleShowPasswordToggle}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                {showPassword ?
                    <i className="fa fa-eye-slash">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3">
                        <path d="m637-425-62-62q4-38-23-65.5T487-576l-62-62q13-5 27-7.5t28-2.5q70 0 119 49t49 119q0 14-2.5 28t-8.5 27Zm133 133-52-52q36-28 65.5-61.5T833-480q-49-101-144.5-158.5T480-696q-26 0-51 3t-49 10l-58-58q38-15 77.5-21t80.5-6q143 0 261.5 77.5T912-480q-22 57-58.5 103.5T770-292Zm-2 202L638-220q-38 14-77.5 21t-80.5 7q-143 0-261.5-77.5T48-480q22-57 58-104t84-85L90-769l51-51 678 679-51 51ZM241-617q-35 28-65 61.5T127-480q49 101 144.5 158.5T480-264q26 0 51-3.5t50-9.5l-45-45q-14 5-28 7.5t-28 2.5q-70 0-119-49t-49-119q0-14 3.5-28t6.5-28l-81-81Zm287 89Zm-96 96Z"/>
                    </svg>
                    </i> :
                    <i className="fa fa-eye">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3">
                        <path d="M480-312q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Zm0-72q-40 0-68-28t-28-68q0-40 28-68t68-28q40 0 68 28t28 68q0 40-28 68t-68 28Zm0 192q-142.6 0-259.8-78.5Q103-349 48-480q55-131 172.2-209.5Q337.4-768 480-768q142.6 0 259.8 78.5Q857-611 912-480q-55 131-172.2 209.5Q622.6-192 480-192Zm0-288Zm0 216q112 0 207-58t146-158q-51-100-146-158t-207-58q-112 0-207 58T127-480q51 100 146 158t207 58Z"/>
                    </svg>
                    </i>
                }
                </button>
            </div>
            {error && <p className="error-message">{error}</p>}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="form-footer" style={{ marginRight: '20px' }}>
                <a href="/forgot-password">Forgot Password?</a>
                <a href="/create">Sign Up</a>
                </div>
                <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Logging In...' : 'Sign In'}
                </button>
            </div>
            </form>
        </div>
        <div className="slant-line"></div>
      </div>
  );
}

export default Login;
