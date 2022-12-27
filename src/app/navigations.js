import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';

export const navigations = [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
  // { label: 'PAGES', type: 'label' },
  // {
  //   name: 'Session/Auth',
  //   icon: 'security',
  //   children: [
  //     { name: 'Sign in', iconText: 'SI', path: '/session/signin' },
  //     { name: 'Sign up', iconText: 'SU', path: '/session/signup' },
  //     { name: 'Forgot Password', iconText: 'FP', path: '/session/forgot-password' },
  //     { name: 'Error', iconText: '404', path: '/session/404' },
  //   ],
  // },
  { label: 'Menu', type: 'label' },
  {
    name: 'Home',
    icon: 'home',
    // badge: { value: '30+', color: 'secondary' },
    children: [
      { name: 'No Item', path: '/material/autocomplete', iconText: 'A' },
    ],
  },
  {
    name: 'Manage',
    icon: <ManageAccountsIcon/>,
    children: [{ name: 'No Items', path: '/charts/echarts', iconText: 'E' }],
  },
  {
    name: 'Examination',
    icon: 'books',
    children: [{ name: 'No Items', path: '/charts/echarts', iconText: 'E' }],
  },
  {
    name: 'Documentation',
    icon: 'launch',
    type: 'extLink',
    path: 'http://demos.ui-lib.com/matx-react-doc/',
  },
];
