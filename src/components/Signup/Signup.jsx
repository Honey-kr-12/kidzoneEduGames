import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    otp: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProceed = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Call your API to send OTP to the email
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
      
      setStep(2);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Call your signup API with all data including OTP
      // Example:
      const response = await fetch('https://api.famcure.com/users/auth/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone_number: '98484499', 
          password: formData.password,
          otp: formData.otp
        }),
      });
      const data = await response.json();
      console.log(data);
      localStorage.setItem('kidzoneuser', JSON.stringify({ name: data.data.user.first_name }));
      if (!response.ok) throw new Error('Signup failed');
      
      // Mock API call for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store user data and navigate
      localStorage.setItem('kidzoneuser', JSON.stringify(formData));
      navigate('/');
      window.location.reload();
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
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
        
        <h2 style={styles.heading}>
          {step === 1 ? 'Join the Fun!' : 'Verify Your Account'}
        </h2>
        
        {error && <div style={styles.error}>{error}</div>}
        
        {step === 1 ? (
          <form onSubmit={handleProceed} style={styles.form}>
            <div style={styles.nameFields}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                style={{ ...styles.input, width: '48%' }}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                style={{ ...styles.input, width: '48%' }}
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Sending OTP...' : 'Proceed'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.otpInfo}>
              <p>We sent a verification code to {formData.email}</p>
              <p>Phone number: 98484499</p>
            </div>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Verifying...' : 'Complete Signup'}
            </button>
            <button 
              type="button" 
              style={styles.secondaryButton}
              onClick={() => setStep(1)}
            >
              Back
            </button>
          </form>
        )}
        
        <p style={styles.footerText}>
          Already have an account?{' '}
          <span style={styles.loginLink} onClick={() => navigate('/login')}>
            Login
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  nameFields: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
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
  secondaryButton: {
    background: '#ffffff',
    color: '#2c3e50',
    padding: '1rem',
    borderRadius: '12px',
    border: '2px solid #feca57',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontFamily: '"Comic Sans MS", cursive, sans-serif',
    marginTop: '0.5rem',
  },
  footerText: {
    marginTop: '1.5rem',
    fontSize: '0.9rem',
    color: '#555555',
  },
  loginLink: {
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
    backgroundColor: '#e8f4fc',
    padding: '1rem',
    borderRadius: '10px',
    marginBottom: '1rem',
    color: '#2980b9',
    fontSize: '0.9rem',
  },
};

export default SignupPage;