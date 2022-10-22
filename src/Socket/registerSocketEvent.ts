import { Message } from 'stompjs';

import { Socket, SocketType } from '.';

type SubscribeType = {
  eventName: string;
  callback: (message: Message) => any;
};

export const registerSocketEvent = (socketType: SocketType, subscribes: SubscribeType[]) => {
  const instance = Socket[socketType];
  if (!instance) throw new Error();
  instance.connect({}, () => {
    if (!instance) throw new Error();
    subscribes.forEach(({ eventName, callback }) => {
      instance.subscribe(eventName, callback);
    });
  });
};
