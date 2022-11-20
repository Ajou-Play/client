import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children }: { children: ReactNode }) => {
  const element = typeof window !== 'undefined' && document.getElementById('portal');
  return element && children ? ReactDOM.createPortal(children, element) : null;
};

export default Portal;
