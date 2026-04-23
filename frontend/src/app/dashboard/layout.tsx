import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { AuthGuard } from '@/components/auth/AuthGuard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary>
      <AuthGuard>
        {children}
      </AuthGuard>
    </ErrorBoundary>
  );
}
