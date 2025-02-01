import React, { useState } from 'react';
import axios from 'axios';


const EmailApp = () => {
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    text: ''
  });
  const [message, setMessage] = useState('');

  const sendEmail = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/send-email', emailData);
      setMessage(response.data.message);
      setEmailData({ to: '', subject: '', text: '' }); // Clear fields
    } catch (error) {
      setMessage('Failed to send email.');
    }
  };

  return (
    <div className="mail-container">
      <h2>Send Email</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={sendEmail}>
        <input
          type="email"
          placeholder="Recipient Email"
          value={emailData.to}
          onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Subject"
          value={emailData.subject}
          onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
          required
        />
        <textarea
          placeholder="Message"
          value={emailData.text}
          onChange={(e) => setEmailData({ ...emailData, text: e.target.value })}
          required
        ></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default EmailApp;
