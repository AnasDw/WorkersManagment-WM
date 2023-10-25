import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet-async';

import { WelcomeContainer, WorkPlaceCard } from 'src/components/WorkPlaceComponnents';
import { auth } from 'src/config/FireBase';
import { getDataFromDocByEmail } from 'src/config/FireBase/CRUD';

const WorkplacePage = () => {
  const [SignedIn, setSignedIn] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [WorkplaceData, setWorkplaceData] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        try {
          if (newUser.SignedIn) console.log('123123');
          getDataFromDocByEmail(auth?.currentUser?.email, 'Managers')
            .then((response) => {
              if (response != false) {
                setWorkplaceData(response);
                setSignedIn(true);
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
      {SignedIn ? <WorkPlaceCard data={WorkplaceData} /> : !Loading ? <WelcomeContainer /> : null}
    </>
  );
};

export default WorkplacePage;
