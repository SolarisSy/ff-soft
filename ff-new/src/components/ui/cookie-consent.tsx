import { useState } from "react";

interface CookieConsentProps {
  onClose?: () => void;
}

export function CookieConsent({ onClose }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#2c2c42] text-white p-4 z-50 max-w-md mx-auto">
      <h3 className="font-medium text-sm mb-1">Consentimento de Cookie</h3>
      <p className="text-xs mb-3">
        A gente usa cookies para melhorar a sua experiência no site. Ao continuar navegando,{" "}
        você concorda com a nossa <a href="/privacidade" className="underline">Política de Privacidade</a>.
      </p>
      <button
        onClick={handleClose}
        className="bg-[#c23743] text-white py-2 px-4 rounded-md text-sm font-medium w-full"
      >
        Continuar e Fechar
      </button>
    </div>
  );
}
