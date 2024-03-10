import type { Metadata } from "next";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import 'react-toastify/dist/ReactToastify.css'
import dynamic from "next/dynamic";
import ToastProvider from "./components/ToastProvider";
import { Suspense } from "react";
const ToastClient = dynamic(() => import("./components/ToastProvider"), { ssr: false });


export const metadata: Metadata = {
  title: "House Controll",
  description: "Criado por Freedom IT",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        {children}
    </body>
    </html>
  );
}
