import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import Iconify from '../iconify';
import { bgBlur } from '../../utils/cssStyles';

import Searchbar from './Searchbar';
import NotificationsPopover from './NotificationsPopover';
import AccountPopover from './AccountPopover/AccountPopover';
import { useGlobalAuthContext } from '../../hooks/useGlobalAuthContext';

const NAV_WIDTH = 180;
const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const navigate = useNavigate();
  const { Loading } = useGlobalAuthContext();

  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />

        {!Loading ? (
          <Stack
            direction="row"
            alignItems="center"
            spacing={{
              xs: 0.5,
              sm: 1,
            }}
          >
            <NotificationsPopover />
            <AccountPopover />
          </Stack>
        ) : (
          <Stack
            sx={{
              '&:hover': {
                backgroundColor: '#E9EBEE',
              },
              borderRadius: 1,
              cursor: 'pointer',
            }}
            direction="row"
            alignItems="center"
            spacing={{
              xs: 0.5,
              sm: 1,
            }}
            onClick={() => {
              navigate('/login', { replace: true });
            }}
          >
            <LoginIcon sx={{ fontSize: '1rem', color: '#343434' }} />
            <Typography variant="h6" sx={{ mb: 5, color: '#343434' }}>
              Login
            </Typography>
          </Stack>
        )}
      </StyledToolbar>
    </StyledRoot>
  );
}
