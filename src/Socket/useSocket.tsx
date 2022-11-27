import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import type { Socket } from 'socket.io-client';

export const useSocket = () => {
  const isSecondRender = useRef(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (isSecondRender.current) setSocket(io('http://localhost:4000'));
    isSecondRender.current = true;
  }, []);

  return socket;
};
