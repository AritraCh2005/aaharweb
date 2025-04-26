import AppProvider from "../components/AppContext";
import Headers from "../components/layout/Headers";
import { Roboto } from 'next/font/google';
import './globals.css';
import { Toaster } from "react-hot-toast";

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata = {
  title: 'AAHAR',
  description: 'Delicious food delivered with love',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${roboto.className} bg-green-900 text-white min-h-screen w-screen overflow-x-hidden`}
      >
        <AppProvider>
          <Toaster />
          <Headers />

          {/* Page content (each section can manage its own container width) */}
          {children}

        </AppProvider>
      </body>
    </html>
  );
}
