import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Drawer, Typography, Avatar } from '@mui/material';
// mock
// hooks
import useResponsive from '../../../../../hooks/useResponsive';
import { useGlobalAuthContext } from '../../../../../hooks/useGlobalAuthContext';

// components
import Logo from '../../../../logo';
import Scrollbar from '../../../../scrollbar';
import NavSection from '../../../../nav-section';

//
import { navConfig, secondNavConfig } from './config';

// ----------------------------------------------------------------------

const NAV_WIDTH = 210;
const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'baseline',
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const isDesktop = useResponsive('up', 'lg');

  const { Manager, loading } = useGlobalAuthContext();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 'auto', display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ py: 5, display: 'inline-flex', px: 7.5 }}>
        <Logo />
      </Box>

      <NavSection data={navConfig} />

      <NavSection sx={{ mt: 16 }} data={secondNavConfig} />

      <Box sx={{ mx: 2.5 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle2" sx={{ color: '#dddee0', fontSize: 13, fontWeight: 500, userSelect: 'none' }}>
            - - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - -{' '}
          </Typography>
        </Box>
        <Link underline="none">
          {!loading ? (
            <StyledAccount sx={{ m: 0.8 }}>
              <Avatar sx={{ width: 25, height: 25 }} src={Manager?.photoURL} alt="photoURL" />
              <Box sx={{ ml: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: 'text.primary', userSelect: 'none', fontSize: 13, fontWeight: 500 }}
                >
                  {Manager?.name}
                </Typography>
              </Box>
            </StyledAccount>
          ) : null}
        </Link>
      </Box>
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop && !loading ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
