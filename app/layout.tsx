import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";
import { CartProvider } from "./context/CartContext";

export const metadata: Metadata = {
  title: "Kaylah & Darcy's Wedding",
  description: "Join us for our special day",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          <Navigation />
          <div className="pt-16">
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}