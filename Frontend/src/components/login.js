import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const navigate = useNavigate();

    const isEmail = (input) => /\S+@\S+\.\S+/.test(input);
    const isPhone = (input) => /^\d{10}$/.test(input);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isEmail(identifier) && !isPhone(identifier)) {
            setError("Please enter a valid email or phone number");
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
          }

    };

    return (
        
        <div className='loginbody'>
            <div>
                <img
                    src="https://cdn.dribbble.com/userupload/24439185/file/original-2c9b06bf14c1c8732d59221e3c498f9f.gif"
                    alt="Login Animation"
                />
            </div>
            <div>
                <div className="container">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Email or phone"
                            required
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                        />
                        {error && <p className="error">{error}</p>}

                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <a href="/create">Create account</a>
                        <button type="submit">Next</button>
                    </form>
                </div>
            </div>
        </div>
        )
}