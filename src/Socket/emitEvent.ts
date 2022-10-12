import { Socket } from '.';

type EmitEvent<T> = {
  eventName: string;
  body: T;
};
export const emitEvent = <T>({ eventName, body }: EmitEvent<T>) => {
  if (!Socket.instance) throw new Error();
  Socket.instance.emit(eventName, body);
};
