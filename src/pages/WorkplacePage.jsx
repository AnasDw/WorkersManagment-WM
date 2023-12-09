import { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

import { WelcomeContainer, WorkPlaceCard } from '../components/WorkPlaceComponents';
import onAuthStateChanged from '../components/utils/onAuthStateChanged';

const WorkplacePage = () => {
  const [SignedIn, setSignedIn] = useState(false);
  const [Provider, setProvider] = useState();
  const [Loading, setLoading] = useState(true);
  const [WorkplaceData, setWorkplaceData] = useState(null);

  useEffect(() => {
    onAuthStateChanged(document.cookie.split('=')[1]).then((response) => {
      setProvider(response.data.data.email);
      setSignedIn(true);
    });
  }, []);

  useEffect(() => {
    if (Provider && SignedIn) {
      try {
        axios.get(`http://localhost:3000/workplace/${Provider}`).then((response) => {
          console.log(response);
          setWorkplaceData(response.data.data);
          setLoading(false);
        });
      } catch (error) {
        console.error(error);
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
      ) : Loading ? (
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
