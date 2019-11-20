/**
 * https://github.com/ReactTraining/react-router/blob/master/packages
 * /react-router-dom/docs/guides/scroll-restoration.md
 * */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
