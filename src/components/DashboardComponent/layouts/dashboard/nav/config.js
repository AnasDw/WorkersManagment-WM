// component
import ApartmentIcon from '@mui/icons-material/Apartment';
import SvgColor from '../../../../svg-color';
// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
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
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
