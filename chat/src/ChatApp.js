import React, { useState, useEffect } from 'react';

const ChatApp = () => {
  const [ws, setWs] = useState(null);
  const [username, setUsername] = useState('');
  const [clients, setClients] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:2000');

    socket.onopen = () => {
      console.log('Connected to WebSocket');
      const name = prompt('Enter your name:');
      setUsername(name);
      socket.send(JSON.stringify({ type: 'register', name }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'clients') {
        setClients(data.clients);
      } else if (data.type === 'message') {
        setMessages((prev) => [...prev, { from: data.from, text: data.text }]);
      }
    };

    socket.onerror = () => alert('WebSocket error! Check your connection.');
    socket.onclose = () => alert('Disconnected from server. Refresh to reconnect.');

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (message && selectedUser && ws) {
      ws.send(JSON.stringify({ type: 'message', recipient: selectedUser, text: message }));
      setMessages((prev) => [...prev, { from: 'Me', text: message }]);
      setMessage('');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2>Online Users</h2>
        <ul style={styles.userList}>
          {clients
            .filter((client) => client !== username)
            .map((client, index) => (
              <li
                key={index}
                style={selectedUser === client ? styles.selectedUser : styles.user}
                onClick={() => setSelectedUser(client)}
              >
                {client}
              </li>
            ))}
        </ul>
      </div>

      <div style={styles.chatBox}>
        <h2>{selectedUser ? `Chat with ${selectedUser}` : 'Select a user'}</h2>
        <div style={styles.messages}>
          {messages.map((msg, index) => (
            <p key={index} style={msg.from === 'Me' ? styles.sentMessage : styles.receivedMessage}>
              <strong>{msg.from}:</strong> {msg.text}
            </p>
          ))}
        </div>
        {selectedUser && (
          <div style={styles.inputContainer}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              style={styles.input}
            />
            <button onClick={handleSendMessage} style={styles.button}>
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '70vh',
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(to bottom right, #a8e6cf, #dcedc1)',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
  },
  sidebar: {
    width: '90%',
    background: '#00796b',
    color: 'white',
    padding: '15px',
    borderRadius: '10px',
    marginBottom: '10px'
  },
  userList: { listStyle: 'none', padding: 0 },
  user: {
    padding: '10px',
    cursor: 'pointer',
    borderBottom: '1px dashed #004d40',
    transition: 'background 0.3s',
  },
  selectedUser: {
    padding: '10px',
    cursor: 'pointer',
    background: '#004d40',
    color: 'white',
    borderRadius: '5px',
    transition: 'background 0.3s',
  },
  chatBox: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '10px',
    border: '2px dotted #00796b'
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    background: '#e0f7fa',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '10px',
    border: '1px dashed #004d40'
  },
  sentMessage: {
    textAlign: 'right',
    color: '#00796b',
    background: '#b2dfdb',
    padding: '10px',
    borderRadius: '10px',
    margin: '5px 0'
  },
  receivedMessage: {
    textAlign: 'left',
    color: '#004d40',
    background: '#80cbc4',
    padding: '10px',
    borderRadius: '10px',
    margin: '5px 0'
  },
  inputContainer: { display: 'flex', marginTop: '10px' },
  input: {
    flex: 1,
    padding: '12px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #00796b'
  },
  button: {
    padding: '12px 20px',
    marginLeft: '10px',
    cursor: 'pointer',
    background: '#00796b',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    transition: 'background 0.3s'
  }
};

export default ChatApp;
