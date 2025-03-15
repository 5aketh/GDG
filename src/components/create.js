import React, { useState } from 'react';

export default function Create() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your account creation logic here (e.g., API call)
    console.log('Full Name:', fullName);
    console.log('Phone:', phone);
    console.log('Username:', username);
    console.log('Password:', password);
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
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Username"
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
            <a href="/">Login</a>
            <button type="submit">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}