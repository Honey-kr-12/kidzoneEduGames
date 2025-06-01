import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; 
import './navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [navStyles, setNavStyles] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login status

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('kidzoneuser'));
    console.log(storedUser);
    
    if (storedUser && storedUser.name || storedUser?.email) {
      setUserName(storedUser.firstName ?? storedUser?.name);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]);  // Re-run this whenever the location changes to update login status

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const isMobileView = window.innerWidth <= 768;

    if (isMobileView) {
      if (scrollY > 850 || location.pathname !== '/') {
        setNavStyles({
          backgroundColor: 'rgba(66, 139, 226, 1)',
          color: 'white',
        });
      } else {
        setNavStyles({
          backgroundColor: 'transparent',
          color: 'white',
        });
      }
    } else {
      if (scrollY > 850 || location.pathname !== '/') {
        setNavStyles({
          backgroundColor: 'rgba(66, 139, 226, 0.3)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          backdropFilter: 'blur(20px)',
          webkitBackdropFilter: 'blur(20px)',
          borderRadius: '10px',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          color: 'black',
        });
      } else {
        setNavStyles({
          backgroundColor: 'transparent',
          boxShadow: 'none',
          backdropFilter: 'none',
          webkitBackdropFilter: 'none',
          borderRadius: '0',
          border: 'none',
          color: 'white',
        });
      }
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    window.location.reload();
    localStorage.removeItem('kidzoneuser');
    setIsLoggedIn(false);
    // navigate('/signup'); 
  };

  return (
    <div className='nav' style={navStyles}>
      <Link to='/' className='imgg'>
        {userName && <span style={{ fontSize: '3.5rem', fontWeight: 'bold' }}>Welcome back, {userName}</span>}
      </Link>
      <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><Link to='/anna' onClick={handleMenuToggle}>AI</Link></li>
          <li><Link to='/' onClick={handleMenuToggle}>Home</Link></li>
          {/* <li><Link to='/about' onClick={handleMenuToggle}>About</Link></li> */}

          {/* Conditionally render Login or Logout */}
          {isLoggedIn ? (
            <li><span onClick={logout} style={{ cursor: 'pointer' }}>Logout</span></li>
          ) : (
            <li><Link to='/login' onClick={handleMenuToggle}>Login</Link></li>
          )}
        </ul>
      </div>
      <div className='hamburger' onClick={handleMenuToggle}>
        {isMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>
    </div>
  );
};

export default Navbar;
