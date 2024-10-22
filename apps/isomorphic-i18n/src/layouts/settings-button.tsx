"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useDirection } from "@hooks/use-direction";
import CogSolidIcon from "@components/icons/cog-solid";
import { ActionIcon } from "rizzui";
import cn from "@utils/class-names";
import DrawerHeader from "@/layouts/drawer-header";
import { usePresets } from "@/config/color-presets";
import { useApplyColorPreset, useColorPresets } from "@/layouts/settings/use-theme-color";
import { useDrawer } from "@/app/shared/drawer-views/use-drawer";
import { useLayout } from "@/layouts/use-layout"; // Import the useLayout hook
import { LAYOUT_OPTIONS } from "@/config/enums";

const SettingsDrawer = dynamic(() => import("@/layouts/settings-drawer"), {
  ssr: false,
});

export default function SettingsButton({
  className,
  children,
  t,
}: {
  className?: string;
  children?: React.ReactNode;
  t?: (key: string) => string | undefined;
}) {
  const COLOR_PRESETS = usePresets();
  const { openDrawer, closeDrawer } = useDrawer();
  const { direction } = useDirection();
  const { colorPresets } = useColorPresets();
  const { setLayout } = useLayout(); // Use the setLayout function

  useApplyColorPreset<any>(colorPresets ?? COLOR_PRESETS[0].colors);

  useEffect(() => {
    document.documentElement.dir = direction ?? "ltr";
  }, [direction]);

  return (
    <ActionIcon
      aria-label="Settings"
      variant="text"
      className={cn(
        "relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9",
        className
      )}
      onClick={() =>
        openDrawer({
          view: (
            <>
              <DrawerHeader onClose={closeDrawer} />
              <SettingsDrawer />
              {/* Buttons to switch layouts */}
              <button onClick={() => setLayout(LAYOUT_OPTIONS.DEFAULT)}>Switch to Default Layout</button>
              <button onClick={() => setLayout(LAYOUT_OPTIONS.HYDROGEN)}>Switch to Hydrogen Layout</button>
              {/* Add more buttons if you have more layouts */}
            </>
          ),
          placement: "right",
          customSize: "420px",
        })
      }
    >
      {children ? (
        children
      ) : (
        <CogSolidIcon
          strokeWidth={1.8}
          className="h-[22px] w-auto animate-spin-slow"
        />
      )}
    </ActionIcon>
  );
}
