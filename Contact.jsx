import React, { useState } from 'react'

function Contact(){
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Form submitted!')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#0b3d91' }}>Contact Us</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          style={{ padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          style={{ padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          style={{ padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc', minHeight: '120px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#0b3d91', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Send Message</button>
      </form>
    </div>
  )
}

export default Contact
