import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import ToastProvider from '../components/ToastProvider';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <ToastProvider/>
        {children}
    </body>
    </html>
  );
}
