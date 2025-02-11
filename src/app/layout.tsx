import "@rainbow-me/rainbowkit/styles.css";
import { fonts } from "../../utils/fonts";
import type { Metadata } from 'next';
import "./globals.css";
import { Providers } from '@/components/providers/Provider';
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  title: {
    default: 'Nad Finance | A lightning-fast DEX for trading and earning on Monad.',
    template: '%s | Nad Finance',
  },
  description: "Trade, earn, and build on Monad's most performant experience.",
  keywords: ['DEX', 'cryptocurrency', 'exchange', 'DeFi', 'blockchain', 'Nad Finance', 'Monad', 'Monad network', 'monad token'],
  authors: [{ name: 'Nad Labs' }],
  creator: 'Nad Labs',
  publisher: 'Nad Labs',
  openGraph: {
    title: 'Nad Finance | A lightning-fast DEX for trading and earning on Monad.',
    description: 'Trade, earn, and build on Monad\'s most performant experience.',
    images: "https://images.nad.finance/preview.png",
    type: 'website',
    url: 'https://nad.finance'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nad_finance',
    siteId: '1888711087530635462',
    creator: '@nad_finance',
    creatorId: '1888711087530635462',
    title: 'Nad Finance | A lightning-fast DEX for trading and earning on Monad.',
    description: 'Trade, earn, and build on Monad\'s most performant experience.',
    images: "https://images.nad.finance/preview.png",
  },
  icons: {
    icon: 'https://images.nad.finance/favicon.ico',
    apple: 'https://images.nad.finance/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL('https://nad.finance'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`min-h-screen ${fonts.baselGroteskBook.variable} ${fonts.baselGroteskMedium.variable}`}>
      <head>
        <link rel="canonical" href="https://nad.finance" />
      </head>
      <body className={`${fonts.inter.className} bg-white min-h-screen font-basel-grotesk-book relative`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
