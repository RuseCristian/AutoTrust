import { useState } from "react";
import LoginPopup from "./login-popup";

export default function LoginPopUpTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleTriggerClick = () => {
    setIsPopupOpen(true);
  };

  return (
    <>
      <div onClick={handleTriggerClick} className="cursor-pointer">
        {children}
      </div>
      {isPopupOpen && (
        <LoginPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </>
  );
}
