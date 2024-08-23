import { useEffect } from "react";

function useLockBodyScroll() {
  useEffect(() => {
    // Get the scrollbar width
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // If there's a scrollbar, add padding to the body to compensate
    if (scrollbarWidth > 0) {
      document.body.style.overflowY = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      // Restore original styles
      document.body.style.overflowY = "";
      document.body.style.paddingRight = "";
    };
  }, []);
}

export default useLockBodyScroll;
