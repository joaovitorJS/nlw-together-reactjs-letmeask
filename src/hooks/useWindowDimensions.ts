import { useEffect, useState } from "react";

type WindowDimensionsType = {
  width: number;
  height: number;
}

function getWindowDimensions() {
  const {innerHeight, innerWidth} = window;

  return {
    width: innerWidth,
    height: innerHeight
  }
}

function useWindowDimensions(): WindowDimensionsType {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
   
    window.addEventListener("resize", () => setWindowDimensions(getWindowDimensions()));

    return () => window.removeEventListener("resize", () => setWindowDimensions(getWindowDimensions()));
  }, []);

  return windowDimensions;
}

export default useWindowDimensions;