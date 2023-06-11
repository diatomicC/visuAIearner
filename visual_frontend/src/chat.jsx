import React, { useState } from 'react';
import axios from 'axios';

function Chat() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post('http://localhost:3001/api/chat', { 
        prompt: message, 
        max_tokens: 100 
      });
      
      setResponse(result.data.choices[0].text.trim());
    } catch (error) {
      console.error(error);
      setResponse('Error during API request');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
      <p>{response}</p>
    </div>
  );
}

export default Chat;
