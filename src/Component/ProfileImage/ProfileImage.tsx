import { useEffect, useRef, useState } from 'react';

import { preloadImg } from '@/Util';

export const ProfileImage = ({ imgPath }: { imgPath: string }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const onError = () => {
    if (imgRef.current === null) return;
    imgRef.current.src = '/asset/ChatProfile.svg';
  };

  useEffect(() => {
    preloadImg([imgPath], () => {
      if (imgRef.current === null) return;
      imgRef.current.src = imgPath;
    });
  }, []);

  return (
    <img
      className='bg-grey-line w-[30px] h-[30px] rounded-[10rem]'
      src={imgPath}
      onError={onError}
      alt='프로필 이미지'
      ref={imgRef}
    />
  );
};
