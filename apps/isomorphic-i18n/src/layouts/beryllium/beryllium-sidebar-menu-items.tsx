import { routes } from '@/config/routes';
import { faPersonCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  PiSquaresFour,
  PiChartLineUp,
  PiUserGear,
  PiBellSimpleRinging,
  PiUser,
  PiEnvelopeSimpleOpen,
  PiFolders,
} from 'react-icons/pi';

// Note: do not add href in the label object, it is rendering as label
export const berylliumSidebarMenuItems = [
  {
    name: 'Home',
    href: routes.admin.homeApi,
    icon: PiChartLineUp,
  },
  {
    name: 'FAQ',
    href: routes.admin.faqAdmin,
    icon: () => <FontAwesomeIcon icon={faPersonCircleQuestion} />,
  },
  {
    name: 'Subscriptions',
    href: routes.admin.subscriptions,
    icon: () => <FontAwesomeIcon icon={faPersonCircleQuestion} />,
  },
  {
    name: 'Feature',
    href: routes.admin.feature,
    icon: () => <FontAwesomeIcon icon={faPersonCircleQuestion} />,
  },
  {
    name: 'Documentation',
    href: routes.admin.documentation,
    icon: () => <FontAwesomeIcon icon={faPersonCircleQuestion} />,
  },
  // label start
  // {
  //   name: 'Overview',
  // },
  // // label end
  // {
  //   name: 'File Manager',
  //   href: '/',
  //   icon: <PiFolders />,
  // },
  // // label start
  // {
  //   name: 'Widgets',
  // },
  // // label end
  // {
  //   name: 'Cards',
  //   href: routes.widgets.cards,
  //   icon: <PiSquaresFour />,
  // },
  // {
  //   name: 'Charts',
  //   href: routes.widgets.charts,
  //   icon: <PiChartLineUp />,
  // },
  // // label start
  // {
  //   name: 'Forms',
  // },
  // // label end
  // {
  //   name: 'Account Settings',
  //   href: routes.forms.profileSettings,
  //   icon: <PiUserGear />,
  // },
  // {
  //   name: 'Notification Preference',
  //   href: routes.forms.notificationPreference,
  //   icon: <PiBellSimpleRinging />,
  // },
  // {
  //   name: 'Personal Information',
  //   href: routes.forms.personalInformation,
  //   icon: <PiUser />,
  // },
  // {
  //   name: 'Newsletter',
  //   href: routes.forms.newsletter,
  //   icon: <PiEnvelopeSimpleOpen />,
  // }
];
