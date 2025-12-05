import type React from "react";
import type { Metadata, Viewport } from "next";

import { ClientProvider, ToastProvider } from "./providers";

import "./globals.scss";

export const metadata: Metadata = {
  title: "Панель Мониторинга Ёкаев",
  description: "Обнаружение духовных аномалий в реальном времени — Токио",
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
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <ClientProvider>
          {children}

          <ToastProvider />
        </ClientProvider>
      </body>
    </html>
  );
}
