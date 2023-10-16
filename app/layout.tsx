"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "../components/providers";
import "@rainbow-me/rainbowkit/styles.css";
import Navbar from "../components/Navbar";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isConn, setIsConn] = useState(false);
  return (
    <html lang="en">
      <body className={inter.className + " container mx-auto"}>
        <Providers>
          <Navbar setIsConn={setIsConn} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
