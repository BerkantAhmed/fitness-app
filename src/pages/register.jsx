import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/users', form);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      alert('Registration failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
       <input
    type="text"
    name="username"
    placeholder="Username"
    value={user.username}
    onChange={handleInputChange}
    style={{ padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '100%' }}
  />
  <input
    type="password"
    name="password"
    placeholder="Password"
    value={user.password}
    onChange={handleInputChange}
    style={{ padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '100%' }}
  />
  <button type="submit" style={{ padding: '10px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }}>
    Submit
  </button>
      <h2>Register</h2>
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
}
