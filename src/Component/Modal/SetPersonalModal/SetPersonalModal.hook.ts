import { useEffect, useState } from 'react';

import { MyInfoType } from './SetPersonalModal.type';
import { getMyInfo } from './SetPersonalModal.util';

const INIT_MYINFO = {
  userId: 0,
  name: 'ss',
  email: '',
  profileImage: '',
  type: 'LOCAL' as MyInfoType['type'],
};
export const useGetMyInfo = (userId: number) => {
  const [myInfo, setMyInfo] = useState<MyInfoType>(INIT_MYINFO);

  useEffect(() => {
    getMyInfo({ userId })
      .then(setMyInfo)
      .catch(() => setMyInfo(INIT_MYINFO));
  }, [userId]);

  return myInfo;
};
