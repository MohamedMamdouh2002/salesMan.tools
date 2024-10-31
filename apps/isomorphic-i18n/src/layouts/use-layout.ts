'use client';

import { LAYOUT_OPTIONS } from '@/config/enums';
import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

// Atom to manage layout state with persistence
const isomorphicLayoutAtom = atom(
  typeof window !== 'undefined'
    ? localStorage.getItem('isomorphic-layout') || LAYOUT_OPTIONS.LITHIUM
    : LAYOUT_OPTIONS.LITHIUM
);

const isomorphicLayoutAtomWithPersistence = atom(
  (get) => get(isomorphicLayoutAtom),
  (get, set, newLayout: string) => {
    set(isomorphicLayoutAtom, newLayout);
    localStorage.setItem('isomorphic-layout', newLayout);
  }
);

export function useLayout() {
  const [layout, setLayout] = useAtom(isomorphicLayoutAtomWithPersistence);
  const isMounted = typeof window !== 'undefined';

  useEffect(() => {
    if (!isMounted) return;

    // Determine the current path
    const pathname = window.location.pathname;
    const isAdminPath = pathname.includes('/admin');
    const isSigninPath = pathname === '/signin';

    // Set layout based on path
    const newLayout = isSigninPath
      ? LAYOUT_OPTIONS.LITHIUM 
      : isAdminPath
      ? LAYOUT_OPTIONS.BERYLLIUM
      : LAYOUT_OPTIONS.LITHIUM;

    if (layout !== newLayout) {
      setLayout(newLayout);
    }
  }, [layout, setLayout, isMounted]);

  return {
    layout,
    setLayout,
  };
}
