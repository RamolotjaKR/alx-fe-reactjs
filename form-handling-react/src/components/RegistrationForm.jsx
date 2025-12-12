import { useState } from 'react';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  
  // Destructure form values for easier access
  const { username, email, password } = formData;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulate API call
    try {
      console.log('Submitting form data:', formData);
      
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setSubmitted(true);
      setErrors({});
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          username: '',
          email: '',
          password: ''
        });
        setSubmitted(false);
      }, 2000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'An error occurred during submission' });
    }
  };

  return (
    <div className="form-container">
      <h2>Registration Form (Controlled Components)</h2>
      
      <form onSubmit={handleSubmit} className="registration-form">
        {/* Username Field */}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            className={errors.username ? 'error-input' : ''}
          />
          {errors.username && (
            <span className="error-message">{errors.username}</span>
          )}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            className={errors.email ? 'error-input' : ''}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            className={errors.password ? 'error-input' : ''}
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Register
        </button>

        {/* Success Message */}
        {submitted && (
          <div className="success-message">
            Registration successful! Welcome, {username}!
          </div>
        )}

        {/* Submission Error */}
        {errors.submit && (
          <div className="error-message">{errors.submit}</div>
        )}
      </form>
    </div>
  );
};

export default RegistrationForm;
