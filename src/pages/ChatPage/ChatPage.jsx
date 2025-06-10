// pages/ChatPage.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useRequests } from '../../context/RequestsContext.jsx';
import { useChat } from '../../context/ChatContext.jsx';
import './ChatPage.css';

const ChatPage = () => {
  const { requestId } = useParams();
  const { requests } = useRequests();
  const { messagesByRequest, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const messagesEndRef = useRef(null);

  const request = requests.find(r => r.id === parseInt(requestId));
  const messages = messagesByRequest[requestId] || [];

  const handleSend = () => {
    if (!input.trim() && !file) return;
    const newMsg = {
      role: 'Donor',
      text: input,
      timestamp: new Date().toLocaleString(),
      file: file ? URL.createObjectURL(file) : null,
    };
    sendMessage(requestId, newMsg);
    setInput('');
    setFile(null);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!request) {
    return (
      <div className="chat-container">
        <div className="chat-request-header">
          <h2>Request Not Found</h2>
          <p>The request you're trying to access does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-request-header">
        <h2>{request.title}</h2>
        <p>{request?.description?.slice(0, 100) || "No description available"}...</p>
        <p className="chat-request-meta">City: {request.city}</p>
      </div>

      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.role.toLowerCase()}`}>
            <div className="chat-role">{msg.role}</div>
            {msg.text && <div className="chat-text">{msg.text}</div>}
            {msg.file && (
              <a href={msg.file} target="_blank" rel="noopener noreferrer" className="chat-file">
                📎 View Attachment
              </a>
            )}
            <div className="chat-time">{msg.timestamp}</div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <label className="file-upload">
          📎<input type="file" onChange={e => setFile(e.target.files[0])} hidden />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
