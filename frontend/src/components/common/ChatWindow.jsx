import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { ArrowRightCircle, Send } from 'react-bootstrap-icons';

const ChatWindow = ({ complaintId, name }) => {
  const [messageInput, setMessageInput] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messageWindowRef = useRef(null);

  const fetchMessageList = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8000/messages/${complaintId}`);
      setMessageList(response.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [complaintId]);

  useEffect(() => {
    if (complaintId) {
      fetchMessageList();
    }
  }, [complaintId, fetchMessageList]);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const sendMessage = async () => {
    if (!messageInput.trim()) return;
    
    try {
      const data = {
        name,
        message: messageInput,
        complaintId
      };
      
      const response = await axios.post('http://localhost:8000/messages', data);
      setMessageList(prev => [...prev, response.data]);
      setMessageInput('');
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    if (messageWindowRef.current) {
      messageWindowRef.current.scrollTop = messageWindowRef.current.scrollHeight;
    }
  };

  return (
    <Container className="chat-container p-0 border rounded shadow-sm" style={{ maxWidth: '600px' }}>
      <div className="bg-primary text-white p-3 rounded-top">
        <h5 className="mb-0 d-flex align-items-center">
          <ArrowRightCircle className="me-2" size={20} />
          Complaint #{complaintId} - Message Center
        </h5>
      </div>
      
      <div 
        ref={messageWindowRef}
        className="message-window p-3 bg-light"
        style={{ height: '400px', overflowY: 'auto' }}
      >
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : messageList.length === 0 ? (
          <div className="text-center text-muted mt-5">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messageList.map((msg) => (
            <div 
              key={msg._id} 
              className={`mb-3 d-flex ${msg.name === name ? 'justify-content-end' : 'justify-content-start'}`}
            >
              <div 
                className={`p-3 rounded ${msg.name === name ? 'bg-primary text-white' : 'bg-white border'}`}
                style={{ maxWidth: '80%' }}
              >
                <div className="fw-bold">{msg.name}</div>
                <div>{msg.message}</div>
                <div 
                  className={`small mt-1 ${msg.name === name ? 'text-white-50' : 'text-muted'}`}
                >
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, 
                  {' '}{new Date(msg.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="p-3 border-top">
        <Form.Group className="d-flex">
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Type your message here..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{ resize: 'none' }}
          />
          <Button 
            variant="primary" 
            onClick={sendMessage}
            disabled={!messageInput.trim() || isLoading}
            className="ms-2"
          >
            <Send size={18} />
          </Button>
        </Form.Group>
      </div>
    </Container>
  );
};

export default ChatWindow;