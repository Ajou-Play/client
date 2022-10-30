import { useEffect, useState } from 'react';

import { preloadImg } from '@/Util';

export const ProfileImage = ({ imgPath }: { imgPath: string }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    preloadImg(['/asset/ChatProfile.svg', imgPath], () => setLoaded(true));
  }, []);

  return loaded ? (
    <img
      src={imgPath}
      alt='프로필 이미지'
    />
  ) : (
    <img
      src='/asset/ChatProfile.svg'
      alt='대체 이미지'
    />
  );
};
