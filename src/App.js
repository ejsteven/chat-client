import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://127.0.0.1:4001';

const socket = socketIOClient(ENDPOINT);

function App() {
  const [display, setDisplay] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('latestMessage', data => {
      setDisplay(data);
    });
    return () => socket.disconnect();
  }, []);

  return (
    <>
      <div>
        <input value={input} onInput={e => setInput(e.target.value)} />
        <button onClick={() => {
          console.log(input)
          socket.emit('newMessage', input)
          setInput('')
        }}>Send</button>
      </div>
      <div>
        <span>Latest message: </span><span>{display}</span>
      </div>
    </>
  );
}

export default App;
