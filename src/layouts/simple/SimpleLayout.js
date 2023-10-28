import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
// components
import Logo from '../../components/logo';

// ----------------------------------------------------------------------

const StyledHeader = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
}));

// ----------------------------------------------------------------------

export default function SimpleLayout() {
  return (
    <>
      <StyledHeader>
        <Logo />
      </StyledHeader>

      <Outlet />
    </>
  );
}
