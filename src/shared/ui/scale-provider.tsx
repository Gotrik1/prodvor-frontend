
'use client';

import React from 'react';
import { useScale } from '@/shared/hooks/use-scale';

// This is a client component wrapper to apply the scale.
export const ScaleProvider = ({ children }: { children: React.ReactNode }) => {
  useScale(); // This hook will apply the scale to the documentElement.
  return <>{children}</>;
};
