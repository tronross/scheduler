////////////////////////////
// useVisualMode Hook
////////////////////////////
import React, { useState, useEffect } from "react";



export default function useVisualMode(visualMode) {
  const [mode, setMode] = useState(visualMode);

  const transition = function(newMode) {
    setMode(newMode);
  }

  return { 
            mode,
            transition
         };
}