import { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

export const useSocket = () => {
  const isSecondRender = useRef(false);
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    console.log('connect');
    if (isSecondRender.current)
      setSocket(
        io('https://127.0.0.1:4000', {
          withCredentials: true,
          transports: ['websocket'],
        }),
      );
    isSecondRender.current = true;
  }, [isSecondRender]);

  return socket;
};
