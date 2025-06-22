import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

const Login = () => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const nav = useNavigate();

const handleLogin = async (e) => {
e.preventDefault();
try {
const res = await api.post('/auth/login', { username, password });
localStorage.setItem('user', res.data.username);
nav('/');
} catch (err) {
alert(err.response?.data?.msg || 'Login failed');
}
};

return (
<div className="min-h-screen flex items-center justify-center bg-green-100">
<form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-80">
<h2 className="text-2xl font-bold text-green-800 mb-6">Login</h2>
<input
type="text"
placeholder="Username"
className="w-full p-2 border border-green-300 mb-4 rounded"
value={username}
onChange={(e) => setUsername(e.target.value)}
/>
<input
type="password"
placeholder="Password"
className="w-full p-2 border border-green-300 mb-6 rounded"
value={password}
onChange={(e) => setPassword(e.target.value)}
/>
<button type="submit" className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700" >
Log In
</button>
</form>
</div>
);
};

export default Login;