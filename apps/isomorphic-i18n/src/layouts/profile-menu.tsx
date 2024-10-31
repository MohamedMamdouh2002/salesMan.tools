"use client";

import { Title, Text, Avatar, Button, Popover } from "rizzui";
import cn from "@utils/class-names";
import { routes } from "@/config/routes";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { useLayout } from "./use-layout";
import { LAYOUT_OPTIONS } from "@/config/enums";

export default function ProfileMenu({
  buttonClassName,
  avatarClassName,
  username = false,
  lang,
}: {
  buttonClassName?: string;
  avatarClassName?: string;
  username?: boolean;
  lang?: string;
}) {
  return (
    <ProfileMenuPopover>
      <Popover.Trigger>
        <button
          className={cn(
            "w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10",
            buttonClassName
          )}
        >
          <Avatar
            src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp"
            name="John Doe"
            className={cn("!h-9 w-9 sm:!h-10 sm:!w-10", avatarClassName)}
          />
          {!!username && (
            <span className="username hidden text-gray-200 dark:text-gray-700 md:inline-flex">
              Hi, Andry
            </span>
          )}
        </button>
      </Popover.Trigger>

      <Popover.Content className="z-[9999] p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
        <DropdownMenu lang={lang} />
      </Popover.Content>
    </ProfileMenuPopover>
  );
}

function ProfileMenuPopover({ children }: React.PropsWithChildren<{}>) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement="bottom-end"
    >
      {children}
    </Popover>
  );
}

const menuItems = [
  {
    name: "Home",
    href: routes.Home,
  },
  {
    name: "text-account-settings",
    href: routes.forms.profileSettings,
  },
  {
    name: "text-activity-log",
    href: "#",
  },
];

function DropdownMenu({ lang }: { lang?: string }) {
  const { t } = useTranslation(lang!);
  const router = useRouter();  

const fName=localStorage.getItem('firstName')
const lName=localStorage.getItem('lastName')
const email=localStorage.getItem('email')
const { setLayout } = useLayout();
// const router = useRouter();

const handleClick = (e: React.MouseEvent) => {
  e.preventDefault(); // Prevent default link navigation
  router.push('/');
  
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('email');
  localStorage.removeItem('firstName');
  localStorage.removeItem('lastName');
  localStorage.removeItem('roles');
  setLayout(LAYOUT_OPTIONS.LITHIUM);
  // window.location.href = '/'; // Manually navigate
};

  return (
    <div className="w-64 text-left rtl:text-right">
      <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
        <Avatar
          src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp"
          name="Albert Flores"
        />
        <div className="ms-3">
          <Title as="h6" className="font-semibold">
            {`${fName} ${lName}`}    
          </Title>
          <Text className="text-gray-600">{email}</Text>
        </div>
      </div>
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={`/${lang}${item.href}`}
            className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
          >
            {t(item.name)}
          </Link>
        ))}
      </div>
      <div className="border-t border-gray-300 px-6 pb-6 pt-5">
      <button  onClick={handleClick} aria-label="Site Logo" className="me-4 hidden w-[155px] shrink-0 text-gray-800 hover:text-gray-900 lg:me-5 xl:block">
          <div  className="flex items-center gap-3 cursor-pointer">
            <h1>log out</h1>
            {/* <Logo className="max-w-[155px]" /> */}
          </div>
      </button>
      {/* <Link href="/">
          <Button
            className="h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
            variant="text"
            onClick={() => logOutAndRedirect()}
            >
            {t('text-sign-out')}
          </Button>
      </Link> */}
      </div>
    </div>
  );
}
