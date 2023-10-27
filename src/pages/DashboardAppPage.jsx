import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';

import { ShortReport } from 'src/components/DashboardComponent/SharedLists';

import { auth } from 'src/config/FireBase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { getUserDataByEmail } from 'src/config/FireBase/CRUD';
import Iconify from '../components/iconify';
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [SignedIn, setSignedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        getUserDataByEmail(auth.currentUser.email).then((res) => {
          if (res) {
            auth.currentUser.displayName = res.UserName;
            setSignedIn(true);
          }
        });
      } else {
        setSignedIn(false);
      }
    });
  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard | WM </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {SignedIn ? ` Hi, Welcome back ${auth.currentUser.displayName}` : null}
        </Typography>

        <Grid container spacing={3}>
          {ShortReport.map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <AppWidgetSummary title={item.title} total={item.total} icon={item.icon} color={item.color} />
            </Grid>
          ))}

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
