import Quill, { SelectionChangeHandler, TextChangeHandler, DeltaStatic } from 'quill';
import QuillCursors from 'quill-cursors';
import { useCallback, useEffect, useState } from 'react';

import 'quill/dist/quill.snow.css';
import { useSocket } from './useQuill';

import { Button } from '@Component/Button';
import { getStorageItem } from '@Util/storage';

const CURSOR_LATENCY = 100;

type Irange = { index: number; length: number };

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['bold', 'italic', 'underline'],
  [{ color: [] }, { background: [] }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ align: [] }],
  ['image', 'blockquote', 'code-block'],
  ['clean'],
];

const SAVE_INTERVAL = 3000;

export const WordView = () => {
  const socket = useSocket();
  Quill.register('modules/cursors', QuillCursors);

  const [quill, setQuill] = useState<Quill>();
  const [docId, setDocId] = useState(1);
  const [cursors, setCursors] = useState<QuillCursors>();

  useEffect(() => {
    if (socket == null || quill == null) return;
    socket.on('load-document', (doc) => {
      quill.setContents(doc);
      quill.enable();
    });

    socket.emit('get-document', docId);
  }, [socket, quill, docId]);

  const updateCursor = (source: string, range: Irange) =>
    setTimeout(() => cursors?.moveCursor(source, range), CURSOR_LATENCY);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const userName = getStorageItem('userName') ?? '게스트';
    const handler: TextChangeHandler = (delta, oldDelta, source) => {
      if (source !== 'user') return;
      socket.emit('send-changes', delta);
    };
    const cursorHandler: SelectionChangeHandler = (cursor: any) =>
      socket.emit('send-cursor-changes', { range: cursor?.range, id: userName });

    quill.on('text-change', handler);
    quill.on('selection-change', cursorHandler);
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler: SelectionChangeHandler = (range, oldRange, source) => {
      if (source !== 'user') return;
      socket.emit('send-cursor-changes', { range, source });
    };

    quill.on('selection-change', handler);
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta: DeltaStatic) => {
      quill.updateContents(delta);
    };
    const cursorHandler = (cursormap: {
      [key: string]: {
        range: Irange;
        color: string;
        id: string;
      };
    }) => {
      Object.entries(cursormap).forEach(([source, { range, color, id }]) => {
        cursors?.createCursor(source, id, color);
        updateCursor(source, range);
      });
    };
    socket.on('receive-changes', handler);
    socket.on('receive-cursor-changes', cursorHandler);
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit('save-document', quill.getContents());
    }, SAVE_INTERVAL);

    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper: HTMLDivElement) => {
    if (wrapper == null) return;
    wrapper.innerHTML = '';
    const editor = document.createElement('div');
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: 'snow',
      modules: {
        cursors: {
          hideDelayMs: 5000,
          hideSpeedMs: 0,
          selectionChangeSource: null,
          transformOnTextChange: true,
        },
        toolbar: TOOLBAR_OPTIONS,
      },
    });
    const cq = q.getModule('cursors');
    // cq.createCursor('1','mike','skyblue');
    q.disable();
    q.setText('Wait a moment pls...');
    setQuill(q);
    setCursors(cq);
  }, []);

  return (
    <div className='w-[100%] h-[calc(100vh-3rem-162px)]'>
      <div className='w-[100%] flex justify-end py-[0.2rem]'>
        <Button
          type='orange'
          content='저장하기'
          onClick={() => {}}
        />
      </div>
      <div
        className='w-[100%] h-[calc(100vh-3rem-162px)]'
        ref={wrapperRef}
      />
    </div>
  );
};
