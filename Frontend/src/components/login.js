import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const navigate = useNavigate();

    const isEmail = (input) => /\S+@\S+\.\S+/.test(input);
    const isPhone = (input) => /^\d{10}$/.test(input);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch ("http://localhost:5000/verify-session", {
                    method:"GET",
                    credentials:"include",
                });

                if (!response.ok){
                    navigate("/");  // redirects to login if no session
                }
            } catch (error) {
                console.error("Session verification failed: ", error);
                navigate("/")
            }
        };

        checkSession()
      }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isEmail(identifier) && !isPhone(identifier)) {
            setError("Please enter a valid email or phone number");
            return;
        }
        
        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                credentials:"include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                loginType: isEmail(identifier) ? "email" : "phone",
                identifier,
                password,
                }),
            });

            const data = await response.json();
            console.log("Response:", data.message);

            if (response.ok) {
                localStorage.setItem("userUID", data.uid);
                navigate(`/user/${data.uid}/home`);   // navigates to home page on successful login
            } else {
                setError(data.message);
            }

        } catch (error) {
            console.log(error)
            setError("Failed to log in. Please try again.");
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