import Sidebar from '@/components/Sidebar';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata = { title: 'DSA Tracker', description: 'Master DSA in 6 months' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} dark`}>
      <body className="min-h-screen antialiased font-sans text-neutral-200 bg-[#050508]">
        <Sidebar />
        <main className="md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
          {children}
        </main>
      </body>
    </html>
  );
}

