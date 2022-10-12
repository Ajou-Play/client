import { useNavigate } from 'react-router-dom';

export const useMovePage = (src?: string | string[]) => {
  const navigate = useNavigate();
  if (typeof src === 'undefined') return (args: string) => navigate(args);
  if (typeof src === 'string') src = [src];
  return src.map((url) => () => navigate(url));
};
