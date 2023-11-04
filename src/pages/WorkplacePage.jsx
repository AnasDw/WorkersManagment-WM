import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { Helmet } from 'react-helmet-async';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

import { auth } from '../config/FireBase';
import { WelcomeContainer, WorkPlaceCard } from '../components/WorkPlaceComponnents';
import { getDataFromDocByEmail } from '../config/FireBase/CRUD';

const WorkplacePage = () => {
  const [SignedIn, setSignedIn] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [WorkplaceData, setWorkplaceData] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        try {
          getDataFromDocByEmail(auth?.currentUser?.email, 'Managers')
            .then((response) => {
              if (response !== false) {
                setWorkplaceData(response);
                setSignedIn(true);
              } else {
                setLoading(false);
              }
            })
            .catch((error) => {
              console.error(error);
              setLoading(false);
            });
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      }
    });
  }, []);

  return (
    <>
      <Helmet>
        <title> Workplace | WM </title>
      </Helmet>
      {SignedIn ? (
        <WorkPlaceCard data={WorkplaceData} />
      ) : !Loading ? (
        <WelcomeContainer />
      ) : (
        <Box sx={{ m: 4, mt: 8 }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      )}
    </>
  );
};

export default WorkplacePage;
