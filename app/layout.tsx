import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/components/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'Student ID System',
    template: '%s | Student ID System'
  },
  description: 'A comprehensive student profile and ID management system for universities. Create, manage, and share your digital student identity with ease.',
  keywords: ['student', 'profile', 'university', 'ID', 'management', 'digital identity', 'CV', 'resume'],
  authors: [{ name: 'Student ID System Team' }],
  creator: 'Abdelaziz Sleem',
  publisher: 'Student ID System',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icons8-id-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons8-id-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons8-id-color-96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/icons8-id-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons8-id-32.png', sizes: '32x32', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://students-system-com.vercel.app/',
    title: 'Student ID System',
    description: 'A comprehensive student profile and ID management system for universities.',
    siteName: 'Student ID System',
    images: [
      {
        url: '/icons8-id-color-96.png',
        width: 96,
        height: 96,
        alt: 'Student ID System',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Student ID System',
    description: 'A comprehensive student profile and ID management system for universities.',
    images: ['/icons8-id-color-96.png'],
  },
  alternates: {
    canonical: 'https://students-system-com.vercel.app/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="mytheme">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
