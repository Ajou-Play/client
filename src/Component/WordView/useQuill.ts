import { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

export const useSocket = () => {
  const isSecondRender = useRef(false);
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    if (isSecondRender.current) setSocket(io('http://localhost:4000'));
    isSecondRender.current = true;
  }, []);

  return socket;
};
