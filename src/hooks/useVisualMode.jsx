////////////////////////////
// useVisualMode Hook
////////////////////////////
import React, { useState, useEffect } from "react";



export default function useVisualMode(visualMode) {
  const [mode, setMode] = useState(visualMode);

  return { mode };
}