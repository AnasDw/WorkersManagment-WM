import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function FeaturedButtonNav() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      m={4}
      sx={{ width: 500, backgroundColor: 'transparent'}}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} />
      <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
    </BottomNavigation>
  );
}
