
'use client';

import { AuthPage } from '@/views/auth';
import { Suspense } from 'react';

// We need a wrapper component to use useSearchParams
function AuthPageComponent() {
  return <AuthPage />;
}

export default function Auth() {
  return (
    <Suspense>
      <AuthPageComponent />
    </Suspense>
  );
}
