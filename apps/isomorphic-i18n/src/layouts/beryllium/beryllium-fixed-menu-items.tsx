import { routes } from '@/config/routes';
import { IconType } from 'react-icons/lib';
import {
  PiBellSimpleRinging,
  PiChartLineUp,
  PiEnvelopeSimpleOpen,
  PiFolders,
  PiHouse,
  PiNotePencil,
  PiPackage,
  PiSquaresFour,
  PiUser,
  PiUserGear,
} from 'react-icons/pi';
import { atom } from 'jotai';
import UserSettingsIcon from '@components/icons/user-settings';
import { faBoltLightning, faBook, faHouseUser, faMoneyBill1Wave, faPersonCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface SubMenuItemType {
  name: string;
  description?: string;
  href: string;
  badge?: string;
}

export interface ItemType {
  [x: string]: any;
  name: string;
  icon: IconType;
  href?: string;
  description?: string;
  badge?: string;
  subMenuItems?: SubMenuItemType[];
}

export interface MenuItemsType {
  id: string;
  name: string;
  title: string;
  icon: IconType ;
  menuItems: ItemType[];
}

export const berylliumMenuItems: MenuItemsType[] = [
  // {
  //   id: '1',
  //   name: 'sidebar-menu-home',
  //   title: 'sidebar-menu-overview',
  //   icon: PiHouse,
  //   menuItems: [
  //     {
  //       name: 'sidebar-menu-file-manager',
  //       href: '/',
  //       icon: PiFolders,
  //     },
  //   ],
  // },
  // {
  //   id: '1',
  //   name: 'dashboard',
  //   title: 'dashboard',
  //   icon: UserSettingsIcon,
  //   menuItems: [
  //     {
  //       name: 'dashboard',
  //       href: routes.admin.admin,
  //       icon: PiSquaresFour,
  //     },
     
  //   ],
  // },
  {
    id: '1',
    name: 'Setting',
    title: 'Setting',
    icon: UserSettingsIcon,
    menuItems: [
      {
        name: 'dashboard',
        href: routes.admin.admin,
        icon: PiSquaresFour,
      },
      {
        name: 'Home',
        href: routes.admin.homeApi,
        icon: () =><FontAwesomeIcon icon={faHouseUser} />,
      },
      {
        name: 'FAQ',
        href: routes.admin.faqAdmin,
        icon: () => <FontAwesomeIcon icon={faPersonCircleQuestion} />,
      },
      {
        name: 'Subscriptions',
        href: routes.admin.subscriptions,
        icon: () => <FontAwesomeIcon icon={faMoneyBill1Wave} /> ,
      },
      {
        name: 'Feature',
        href: routes.admin.feature,
        icon: () =><FontAwesomeIcon icon={faBoltLightning} />,
      },
      {
        name: 'Documentation',
        href: routes.admin.documentation,
        icon: () => <FontAwesomeIcon icon={faBook} />,
      },
    ],
  },
  // {
  //   id: '4',
  //   name: 'sidebar-menu-widgets',
  //   title: 'sidebar-menu-widgets',
  //   icon: PiPackage,
  //   menuItems: [
  //     {
  //       name: 'sidebar-menu-cards',
  //       href: routes.widgets.cards,
  //       icon: PiSquaresFour,
  //     },
  //     {
  //       name: 'sidebar-menu-charts',
  //       href: routes.widgets.charts,
  //       icon: PiChartLineUp,
  //     },
  //   ],
  // },
  // {
  //   id: '5',
  //   name: 'sidebar-menu-forms',
  //   title: 'sidebar-menu-forms',
  //   icon: PiNotePencil,
  //   menuItems: [
  //     {
  //       name: 'sidebar-menu-account-settings',
  //       href: routes.forms.profileSettings,
  //       icon: PiUserGear,
  //     },
  //     {
  //       name: 'sidebar-menu-notification-preference',
  //       href: routes.forms.notificationPreference,
  //       icon: PiBellSimpleRinging,
  //     },
  //     {
  //       name: 'sidebar-menu-personal-information',
  //       href: routes.forms.personalInformation,
  //       icon: PiUser,
  //     },
  //     {
  //       name: 'sidebar-menu-newsletter',
  //       href: routes.forms.newsletter,
  //       icon: PiEnvelopeSimpleOpen,
  //     },
  //   ],
  // },
];
export const berylliumMenuItemAtom = atom(berylliumMenuItems[0]);
