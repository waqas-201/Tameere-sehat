import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { AuthProvider } from '@/context/AuthContext';
import ClientShell from '@/components/ClientShell';

export const metadata: Metadata = {
  title: 'Tameer-e-Sehat | Premier Hakeem Dawakhana & 100% Pure Herbal Store Pakistan',
  description: 'Pakistan’s trusted Unani Dawakhana & Herbal Store since 1990 in Karachi. Certified Hakeem online consultations, Tahiri Marham, Himalayan Salajeet, Arq Kasni, and pure herbs with nationwide Cash on Delivery.',
  keywords: [
    'Tameer-e-Sehat',
    'Tameer e Sehat Dawakhana',
    'Hakeem Pakistan',
    'Online Hakeem consultation',
    'Pansari store online Pakistan',
    'Tahiri Marham',
    'Pure Himalayan Salajeet',
    'Arq Kasni',
    'Unani Tibb medicine',
    'Korangi Karachi Dawakhana'
  ],
  openGraph: {
    title: 'Tameer-e-Sehat | Premier Hakeem Dawakhana & Herbal Store Pakistan',
    description: '100% Pure Organic Unani Remedies, Herbal Formulations & Certified Hakeem Consultations since 1990.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tameer-e-Sehat | Premier Hakeem Dawakhana & Herbal Store Pakistan',
    description: '100% Pure Organic Unani Remedies & Certified Hakeem Consultations since 1990.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning className="bg-[#fdfcf8] text-[#1a2e1a] antialiased selection:bg-[#f59e0b] selection:text-[#1a2e1a] font-sans">
        <AuthProvider>
          <AppProvider>
            <ClientShell>
              {children}
            </ClientShell>
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
