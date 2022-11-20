import { Navigate } from 'react-router-dom';

import { PrivatePageProps } from './PrivatePage.type';

import { getStorageItem } from '@Util/storage';

export const PrivatePage = ({ component: Component }: PrivatePageProps) => {
  const user = getStorageItem('userId');
  return <>{user ? <Navigate to='/main' /> : <Component />} </>;
};
