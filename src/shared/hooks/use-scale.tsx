
'use client';

import { useState, useEffect } from 'react';

const SCALE_KEY = 'prodvor-app-scale';
const DEFAULT_SCALE = 1;

export function useScale() {
  // Initialize state from localStorage or default
  const [scale, setScale] = useState(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_SCALE;
    }
    try {
      const item = window.localStorage.getItem(SCALE_KEY);
      return item ? JSON.parse(item) : DEFAULT_SCALE;
    } catch (error) {
      console.error(error);
      return DEFAULT_SCALE;
    }
  });

  // Effect to update localStorage and CSS variable when scale changes
  useEffect(() => {
    try {
      // Update localStorage
      window.localStorage.setItem(SCALE_KEY, JSON.stringify(scale));
      // Update CSS variable on the root element
      document.documentElement.style.setProperty('--app-scale', String(scale));
    } catch (error) {
      console.error(error);
    }
  }, [scale]);

  return { scale, setScale };
}
