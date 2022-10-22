import { Socket, SocketType } from '.';

type EmitEvent<T> = {
  socketType: SocketType;
  eventName: string;
  body: T;
};
export const emitEvent = <T>({ socketType, eventName, body }: EmitEvent<T>) => {
  const instance = Socket[socketType];
  if (!instance) throw new Error();
  instance.send(eventName, {}, JSON.stringify(body));
};
