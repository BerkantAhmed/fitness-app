import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // изтриваме потребителя
    navigate('/login'); // връщаме го на login страницата
  };

  const isLoggedIn = localStorage.getItem('user');

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid black' }}>
      <Link to="/">Home</Link> | 
      {!isLoggedIn && <Link to="/register">Register</Link>} | 
      {!isLoggedIn && <Link to="/login">Login</Link>} | 
      {isLoggedIn && <Link to="/dashboard">Dashboard</Link>} | 
      {isLoggedIn && (
        <button onClick={handleLogout} style={{ marginLeft: '10px', background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' }}>
          Logout
        </button>
      )}
    </nav>
  );
}

