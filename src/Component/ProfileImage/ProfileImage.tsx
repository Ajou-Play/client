import { useState } from 'react';

export const ProfileImage = ({ imgPath }: { imgPath: string }) => {
  const [loaded, setLoaded] = useState(false);

  return loaded ? (
    <img
      src={imgPath}
      onLoad={() => setLoaded(true)}
      alt='프로필 이미지'
    />
  ) : (
    <img
      src='/asset/ChatProfile.svg'
      alt='대체 이미지'
    />
  );
};
