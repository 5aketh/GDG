import React, { useState } from 'react';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here (e.g., API call)
    console.log('Username:', username);
    console.log('Password:', password);
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
                            placeholder="Username or phone"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
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