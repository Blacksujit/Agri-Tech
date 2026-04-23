'use client';

import { PageTransition } from '@/components/motion/PageTransition';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
