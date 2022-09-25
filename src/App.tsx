import { useToggle } from '@Hook/.';

function App() {
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
}
export default App;
