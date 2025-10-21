import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mortgage Calculator",
  description: "Calculate your mortgage payments and view current rates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
