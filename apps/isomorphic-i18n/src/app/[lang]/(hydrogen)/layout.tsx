'use client';

import { useEffect, useState } from 'react';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { useLayout } from '@/layouts/use-layout';
import HydrogenLayout from '@/layouts/hydrogen/layout';
import HeliumLayout from '@/layouts/helium/helium-layout';
import BerylliumLayout from '@/layouts/beryllium/beryllium-layout';
import LithiumLayout from '@/layouts/lithium/lithium-layout';
import BoronLayout from '@/layouts/boron/boron-layout';
import CarbonLayout from '@/layouts/carbon/carbon-layout';
import { useIsMounted } from '@hooks/use-is-mounted';

export default function DefaultLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
  const { layout } = useLayout();
  const isMounted = useIsMounted();
  const [currentLayout, setCurrentLayout] = useState<string>(layout);

  useEffect(() => {
    setCurrentLayout(layout);
  }, [layout]);

  if (!isMounted) {
    return null;
  }

  const isAdminPath = typeof window !== 'undefined' && window.location.pathname.includes('/admin');
  const layoutToApply = isAdminPath ? (layout || LAYOUT_OPTIONS.BERYLLIUM) : (layout || LAYOUT_OPTIONS.LITHIUM);

  switch (layoutToApply) {
    case LAYOUT_OPTIONS.HELIUM:
      return <HeliumLayout lang={lang}>{children}</HeliumLayout>;
    case LAYOUT_OPTIONS.LITHIUM:
      return <LithiumLayout lang={lang}>{children}</LithiumLayout>;
    case LAYOUT_OPTIONS.BERYLLIUM:
      return <BerylliumLayout lang={lang}>{children}</BerylliumLayout>;
    case LAYOUT_OPTIONS.BORON:
      return <BoronLayout lang={lang}>{children}</BoronLayout>;
    case LAYOUT_OPTIONS.CARBON:
      return <CarbonLayout lang={lang}>{children}</CarbonLayout>;
    default:
      return <HydrogenLayout lang={lang}>{children}</HydrogenLayout>;
  }
}
