// https://stackoverflow.com/questions/36862334/
// get-viewport-window-height-in-reactjs
import { useState, useEffect } from 'react';

const MOBILEWIDTHMAX = 700;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

// custom react hook function:
// wrapper function to provide window dimensions and update them on change
export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowDimensions.width < MOBILEWIDTHMAX;

  return [windowDimensions, isMobile];
}
