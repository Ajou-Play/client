import { useState } from 'react';

type UseToggle = {
  state: boolean;
  toggleState: () => void;
  falseState: () => void;
  trueState: () => void;
};
export const useToggle = (init = false): UseToggle => {
  const [state, setState] = useState(init);
  const toggleState = () => setState((prev) => !prev);
  const falseState = () => setState(false);
  const trueState = () => setState(true);
  return {
    state,
    toggleState,
    falseState,
    trueState,
  };
};
