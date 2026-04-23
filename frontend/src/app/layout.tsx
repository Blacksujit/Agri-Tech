import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { AppProviders } from '@/components/providers/AppProviders';
import { Toaster } from '@/components/ui/toaster';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Arogya Krishi - AI Agriculture Platform',
  description: 'AI-powered crop disease detection, soil prediction, and fertilizer recommendations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <QueryProvider>
            <AppProviders>{children}</AppProviders>
            <Toaster />
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
