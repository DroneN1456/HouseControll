import type { Metadata } from "next";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import ToastClient from "./components/ToastClient";


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
        <ToastClient/>
    </body>
    </html>
  );
}
