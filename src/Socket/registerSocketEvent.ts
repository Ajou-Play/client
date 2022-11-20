import { Socket, SocketType } from '.';

type SubscribeType = {
  eventName: string;
  callback: (data: any) => any;
};

export const registerSocketEvent = (
  socketType: SocketType,
  subscribes: SubscribeType[],
  cb?: Function,
) => {
  const instance = Socket[socketType];
  if (!instance) throw new Error();
  instance.connect({}, () => {
    if (!instance) throw new Error();
    subscribes.forEach(({ eventName, callback }) => {
      instance.subscribe(eventName, callback);
    });
    if (cb) cb();
  });
};
