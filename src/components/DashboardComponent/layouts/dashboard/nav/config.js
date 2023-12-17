// component
import ApartmentIcon from '@mui/icons-material/Apartment';
import SettingsIcon from '@mui/icons-material/Settings';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ArticleIcon from '@mui/icons-material/Article';
import GridViewIcon from '@mui/icons-material/GridView';
import SvgColor from '../../../../svg-color';
// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: <GridViewIcon />,
  },
  {
    title: 'Workplace',
    path: '/dashboard/workplace',
    icon: <ApartmentIcon />,
  },
  {
    title: 'workers',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'files',
    path: '/',
    icon: <FolderOpenIcon />,
  },
  {
    title: 'usage',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'settings',
    path: '/',
    icon: <SettingsIcon />,
  },
];
const secondNavConfig = [
  {
    title: 'documentations',
    path: '/',
    icon: <ArticleIcon />,
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
];

export { navConfig, secondNavConfig };
