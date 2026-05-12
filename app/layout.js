import { Playfair_Display, Lato } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  display: 'swap',
});

export const metadata = {
  title: "Les Délices | Restaurante en Punta del Este",
  description: "Disfrute de la mejor gastronomía en Punta del Este. Reservas online, menú completo y una experiencia única en Les Délices.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${playfair.variable} ${lato.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
