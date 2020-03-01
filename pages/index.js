import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

function App() {
  const [socket, setSocket] = useState();

  useEffect(() => {
    setSocket(io());
  }, []);

  return <button onClick={() => socket && socket.emit('yay')}>YAY</button>;
}

export default App;
