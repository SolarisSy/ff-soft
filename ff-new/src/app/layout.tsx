import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Centro de Recarga Free Fire",
  description:
    "O site oficial para comprar diamantes no Free Fire. Vários métodos de pagamento estão disponíveis para os jogadores do Brasil, incluindo Boleto Bancário, Transferência Bancária, PayPal, cartões de crédito e outros.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="max-w-md mx-auto min-h-screen">{children}</body>
    </html>
  );
}
