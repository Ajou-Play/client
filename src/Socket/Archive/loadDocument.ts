import { DeltaStatic } from 'quill';

import { emitEvent } from '../emitEvent';

const eventName = '/pub/archive/load';
const socketType = 'archiveInstance';

export const sendMessage = (body: DeltaStatic) => emitEvent({ socketType, eventName, body });
