////////////////////////////
// useVisualMode Hook
////////////////////////////
import React, { useState, useEffect } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = function(newMode, replace) {
    
    history.push(newMode);
    
    setMode(history[history.length - 1]);
  }

  const back = function() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  }

  return { 
            mode,
            transition,
            back
         };
}