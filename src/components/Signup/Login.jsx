import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' or 'otp'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otp: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Call your OTP sending API
      // Example:
      const response = await fetch('https://api.famcure.com/users/auth/sendOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });
      
      if (!response.ok) throw new Error('Failed to send OTP');
      
      // Mock API call for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOtpSent(true);
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (loginMethod === 'password') {
        // Call your password login API
        // Example:
        const response = await fetch('https://api.famcure.com/users/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: formData.email,
            password: formData.password
        }),
    });
    const data = await response.json();
    console.log(data);
    localStorage.setItem('kidzoneuser', JSON.stringify({ name: data.data.user.first_name }));
        // console.log(await response.json());
        
        if (!response.ok) throw new Error('Login failed');
      } else {
        // Call your OTP login API
        // Example:
        const response = await fetch('https://api.famcure.com/users/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            otp: formData.otp
          }),
        });
        const data = await response.json();
        console.log(data);
        localStorage.setItem('kidzoneuser', JSON.stringify({ name: data.data.user.first_name }));
        if (!response.ok) throw new Error('OTP verification failed');
      }
    //   console.log(response.data);
      
      // Mock API call for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store user data and navigate
      navigate('/');
      window.location.reload();
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <span style={styles.logoText}>KID ZONE</span>
          <div style={styles.gameControllerIcon}>🎮</div>
        </div>
        
        <h2 style={styles.heading}>Welcome Back!</h2>
        
        <div style={styles.toggleContainer}>
          <button
            style={{
              ...styles.toggleButton,
              ...(loginMethod === 'password' ? styles.activeToggle : {})
            }}
            onClick={() => {
              setLoginMethod('password');
              setOtpSent(false);
              setError('');
            }}
          >
            Password
          </button>
          <button
            style={{
              ...styles.toggleButton,
              ...(loginMethod === 'otp' ? styles.activeToggle : {})
            }}
            onClick={() => {
              setLoginMethod('otp');
              setOtpSent(false);
              setError('');
            }}
          >
            OTP
          </button>
        </div>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <form onSubmit={loginMethod === 'otp' && !otpSent ? handleSendOtp : handleLogin} style={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          
          {loginMethod === 'password' ? (
            <>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <p style={styles.forgotPassword} onClick={() => navigate('/forgot-password')}>
                Forgot Password?
              </p>
            </>
          ) : (
            <>
              {otpSent ? (
                <>
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={formData.otp}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                  <p style={styles.otpInfo}>
                    We sent a verification code to your email
                  </p>
                </>
              ) : (
                <p style={styles.otpInfo}>
                  We'll send a one-time password to your email
                </p>
              )}
            </>
          )}
          
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? (
              'Please wait...'
            ) : loginMethod === 'otp' && !otpSent ? (
              'Send OTP'
            ) : (
              'Login'
            )}
          </button>
        </form>
        
        <p style={styles.footerText}>
          Don't have an account?{' '}
          <span style={styles.signupLink} onClick={() => navigate('/signup')}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)',
    padding: '2rem',
    fontFamily: '"Comic Sans MS", cursive, sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: '450px',
    padding: '2.5rem',
    borderRadius: '20px',
    backgroundColor: '#ffffff',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    border: '5px solid #ff9f43',
    position: 'relative',
    overflow: 'hidden',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem',
  },
  logoText: {
    fontSize: '2.2rem',
    fontWeight: 'bold',
    color: '#ff9f43',
    textShadow: '2px 2px 0px #feca57',
    marginRight: '10px',
  },
  gameControllerIcon: {
    fontSize: '2rem',
    transform: 'rotate(-15deg)',
  },
  heading: {
    fontSize: '1.8rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    color: '#2c3e50',
  },
  toggleContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1.5rem',
    gap: '0.5rem',
  },
  toggleButton: {
    padding: '0.6rem 1.2rem',
    borderRadius: '20px',
    border: '2px solid #feca57',
    background: 'transparent',
    color: '#2c3e50',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'all 0.3s',
    fontFamily: '"Comic Sans MS", cursive, sans-serif',
  },
  activeToggle: {
    background: '#feca57',
    color: '#ffffff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  input: {
    padding: '0.9rem 1rem',
    border: '2px solid #feca57',
    borderRadius: '12px',
    fontSize: '1rem',
    transition: 'all 0.3s',
    backgroundColor: '#f9f9f9',
    fontFamily: '"Comic Sans MS", cursive, sans-serif',
  },
  button: {
    background: 'linear-gradient(135deg, #ff9f43 0%, #feca57 100%)',
    color: '#ffffff',
    padding: '1rem',
    borderRadius: '12px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 4px 0 #e67e22',
    fontFamily: '"Comic Sans MS", cursive, sans-serif',
    marginTop: '0.5rem',
  },
  footerText: {
    marginTop: '1.5rem',
    fontSize: '0.9rem',
    color: '#555555',
  },
  signupLink: {
    color: '#ff9f43',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  error: {
    color: '#e74c3c',
    backgroundColor: '#fadbd8',
    padding: '0.8rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    fontSize: '0.9rem',
  },
  otpInfo: {
    color: '#2980b9',
    fontSize: '0.9rem',
    margin: '-0.5rem 0 0.5rem 0',
  },
  forgotPassword: {
    color: '#ff9f43',
    fontSize: '0.9rem',
    textAlign: 'right',
    cursor: 'pointer',
    margin: '-0.5rem 0 0.5rem 0',
    textDecoration: 'underline',
  },
};

export default Login;