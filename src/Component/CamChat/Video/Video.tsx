import { useEffect, useRef } from 'react';

import type { VideoProps } from './Video.type';

export const Video = ({ stream }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current!.srcObject = stream;
  }, [stream]);

  return (
    <video
      className='rounded-xl w-[100px] h-[100px] mr-2'
      muted
      autoPlay
      ref={videoRef}
    />
  );
};
