import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Email is invalid';
    if (!formData.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
    try {
      const existing = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
      existing.push({ ...formData, submittedAt: new Date().toISOString() });
      localStorage.setItem('contactSubmissions', JSON.stringify(existing));
    } catch (err) {
      // ignore storage errors
    }

    setFormData({ name: '', email: '', message: '' });
    setErrors({});
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}>
      <h2 style={{ color: '#0b3d91' }}>Contact Us</h2>

      {submitted && (
        <div style={{ padding: '10px', marginBottom: '12px', borderRadius: '4px', background: '#e6ffed', color: '#0b6623' }}>
          Thank you! Your message has been saved locally.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: errors.name ? '1px solid #e74c3c' : '1px solid #ccc' }}
        />
        {errors.name && <div style={{ color: '#e74c3c', marginTop: '6px' }}>{errors.name}</div>}

        <label style={{ display: 'block', margin: '12px 0 6px 0', fontWeight: 600 }}>Email</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: errors.email ? '1px solid #e74c3c' : '1px solid #ccc' }}
        />
        {errors.email && <div style={{ color: '#e74c3c', marginTop: '6px' }}>{errors.email}</div>}

        <label style={{ display: 'block', margin: '12px 0 6px 0', fontWeight: 600 }}>Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', minHeight: '120px', borderRadius: '4px', border: errors.message ? '1px solid #e74c3c' : '1px solid #ccc' }}
        />
        {errors.message && <div style={{ color: '#e74c3c', marginTop: '6px' }}>{errors.message}</div>}

        <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
          <button type="submit" style={{ padding: '10px 16px', background: '#0b3d91', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Send Message</button>
          <button
            type="button"
            onClick={() => { setFormData({ name: '', email: '', message: '' }); setErrors({}); setSubmitted(false); }}
            style={{ padding: '10px 16px', background: '#f0f0f0', color: '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Clear
          </button>
        </div>
      </form>

      <div style={{ marginTop: '18px', fontSize: '0.9rem', color: '#666' }}>
        This form demonstrates local interactivity and client-side validation. Submissions are saved to localStorage as a demo.
      </div>
    </div>
  );
}

export default Contact;
