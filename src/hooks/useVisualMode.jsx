////////////////////////////
// useVisualMode Hook
////////////////////////////

import { useState } from 'react';

/**
 * Returns visual mode to Appointment component.
 *
 * @param {string} initialMode The initial visual mode of the Appointment component.
 **
 * transition method 
 * @param {string} newMode The visual mode to transition the Appointment component to.
 * @param {boolean} replace Removes inappropriate modes from history.
 */

export default function useVisualMode(initialMode) {
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
