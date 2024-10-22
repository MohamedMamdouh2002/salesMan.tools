'use client';

import { LAYOUT_OPTIONS } from '@/config/enums';
import { atom, useAtom } from 'jotai';

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

  // Determine if the current path is an admin path
  const pathname = isMounted ? window.location.pathname : '';
  const isAdminPath = pathname.includes('/admin');
  const isRootPath = pathname === '/'; // Check if the current path is the root path

  // Override layout to Beryllium if in admin path, otherwise use Lithium for root path
  const effectiveLayout = isAdminPath ? LAYOUT_OPTIONS.BERYLLIUM : isRootPath ? LAYOUT_OPTIONS.LITHIUM : layout;

  return {
    layout: effectiveLayout,
    setLayout,
  };
}
