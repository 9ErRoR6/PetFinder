import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // скролить на верх при зміні маршруту
  }, [pathname]);

  return null;
};

export default ScrollToTop;