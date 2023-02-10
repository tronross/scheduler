////////////////////////////
// useVisualMode Hook
////////////////////////////

import { useState } from 'react';

export default function useVisualMode(initialMode) {
  // const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = function(newMode, replace = false) {
    if (replace) {
      setHistory(prev => [...prev.slice(0, -1), newMode]);
    } else {
      setHistory(prev => [...prev, newMode]);
    }
  }

  const back = function() {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, -1));
    }
  }

  return { 
            mode: history[history.length -1 ],
            transition,
            back
         };
}
