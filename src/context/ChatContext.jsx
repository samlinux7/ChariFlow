// context/ChatContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messagesByRequest, setMessagesByRequest] = useState({});

  // Load from localStorage once
  useEffect(() => {
    const stored = localStorage.getItem('chariflow-chats');
    if (stored) {
      setMessagesByRequest(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('chariflow-chats', JSON.stringify(messagesByRequest));
  }, [messagesByRequest]);

  const sendMessage = (requestId, message) => {
    setMessagesByRequest(prev => {
      const newMessages = [...(prev[requestId] || []), message];
      return {
        ...prev,
        [requestId]: newMessages,
      };
    });
  };

  return (
    <ChatContext.Provider value={{ messagesByRequest, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
