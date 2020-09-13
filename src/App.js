import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://127.0.0.1:4001';

const socket = socketIOClient(ENDPOINT);

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('messageHistory', history => {
      setMessages(history);
    });
    socket.on('newMessage', message => {
      setMessages(messages => [...messages, message])
    })
    return () => socket.disconnect();
  }, []);

  return (
    <>
      <div>
        <input value={input} onInput={e => setInput(e.target.value)} />
        <button onClick={() => {
          if (input !== '') {
            console.log(messages)
            socket.emit('sendMessage', input)
           // setInput('')
          }
        }}>Send</button>
        <button onClick={() => console.log(messages)}>Get History</button>
      </div>
      <div>
        <ol>{messages.map((message, index) => <li key={index}>{message}</li>)}</ol>
      </div>
    </>
  );
}

export default App;
