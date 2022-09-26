import { useToggle } from '@Hook/.';

export const MainPage = () => {
  const { state, toggleState } = useToggle();
  return (
    <div
      className='App'
      onClick={toggleState}
      aria-hidden
    >
      hihihihihi
      {state && <div>hihi</div>}
    </div>
  );
};
