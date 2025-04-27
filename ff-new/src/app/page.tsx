"use client";

import { useState } from "react";
import { Header } from "@/components/ui/header";
import { Banner } from "@/components/ui/banner";
import { GameSelection } from "@/components/ui/game-selection";
import { GameCard } from "@/components/ui/game-card";
import { FreeItem } from "@/components/ui/free-item";
import { LoginForm } from "@/components/ui/login-form";
import { Footer } from "@/components/ui/footer";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { LoggedInPayment } from "@/components/ui/logged-in-payment";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookieConsentVisible, setCookieConsentVisible] = useState(true);

  // Função para lidar com o login
  const handleLogin = () => {
    setIsLoggedIn(true);
    // Esconde o consentimento de cookie quando o usuário faz login
    setCookieConsentVisible(false);
  };

  // Função para fechar o consentimento de cookie
  const handleCloseCookieConsent = () => {
    setCookieConsentVisible(false);
  };

  return (
    <main className="bg-[#f9f8f8] min-h-screen pb-4">
      <Header />
      <Banner />
      <GameSelection />
      <GameCard />
      <FreeItem />

      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <LoggedInPayment />
      )}

      <Footer />

      {cookieConsentVisible && (
        <CookieConsent onClose={handleCloseCookieConsent} />
      )}
    </main>
  );
}
