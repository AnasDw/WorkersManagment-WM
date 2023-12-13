import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import { getRequest } from '../api/axiosVerbs';

import { WelcomeContainer, WorkPlaceCard } from '../components/WorkPlaceComponents';
import { useGlobalAuthContext } from '../hooks/useGlobalAuthContext';

const WorkplacePage = () => {
  const [SignedIn, setSignedIn] = useState(false);
  const [Provider, setProvider] = useState();
  const [Loading, setLoading] = useState(true);
  const [WorkplaceData, setWorkplaceData] = useState(null);

  const { Manager } = useGlobalAuthContext();

  useEffect(() => {
    if (Manager) {
      setProvider(Manager.email);
      setSignedIn(true);
    }
  }, [Manager]);

  useEffect(() => {
    if (Provider && SignedIn) {
      try {
        getRequest(`workplace/${Provider}`).then((response) => {
          setWorkplaceData(response.data.data);
          setLoading(false);
        });
      } catch (error) {
        console.error(error.response?.data.error);
      }
    }
  }, [Provider, SignedIn]);

  return (
    <>
      <Helmet>
        <title> Workplace | WM </title>
      </Helmet>
      {SignedIn && WorkplaceData ? (
        <WorkPlaceCard data={WorkplaceData} />
      ) : !Loading && !WorkplaceData ? (
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
