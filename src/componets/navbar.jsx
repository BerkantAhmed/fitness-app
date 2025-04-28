import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // изтриваме потребителя
    navigate('/login'); // връщаме го на login страницата
  };

  const isLoggedIn = localStorage.getItem('user');

  return (
    <nav style={{ padding: '10px', background: '#3498db', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <Link to="/" style={{ color: 'white', fontSize: '20px', textDecoration: 'none' }}>Home</Link>
  {!isLoggedIn && <Link to="/register" style={{ color: 'white', marginLeft: '15px' }}>Register</Link>}
  {!isLoggedIn && <Link to="/login" style={{ color: 'white', marginLeft: '15px' }}>Login</Link>}
  {isLoggedIn && <Link to="/dashboard" style={{ color: 'white', marginLeft: '15px' }}>Dashboard</Link>}
  {isLoggedIn && (
    <button onClick={handleLogout} style={{ marginLeft: '15px', background: '#e74c3c', color: 'white', padding: '8px 15px', borderRadius: '5px', border: 'none' }}>
      Logout
    </button>
  )}
</nav>

  );
}


