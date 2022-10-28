import { useEffect, useRef } from 'react';

import type { VideoProps } from './Video.type';

export const Video = ({ stream }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current!.srcObject = stream;
  }, [stream]);

  return (
    <div>
      <video
        muted
        autoPlay
        ref={videoRef}
      />
    </div>
  );
};
