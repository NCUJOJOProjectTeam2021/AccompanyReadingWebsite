// component
import Iconify from "../Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Blog',
    path: '/forum',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'Voice Room',
    path: '/roomsList',
    icon: getIcon('eva:people-fill'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon('eva:lock-fill'),
  // },
];

export default navConfig;
