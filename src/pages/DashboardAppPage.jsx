import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useNavigate } from 'react-router-dom';

// @mui
import { Grid, Container, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import { ShortReport } from '../components/DashboardComponent/SharedLists';
import Iconify from '../components/iconify';
import {
  AppTasks,
  AppOrderTimeline,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppLinkGeneratorTaskEnforcer,
} from '../components/DashboardComponent/Apps/@dashboard/app';

import onAuthStateChanged from '../components/utils/onAuthStateChanged';
import { getRequest } from '../api/axiosVerbs';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const [Loading, setLoading] = useState(false);
  const [Manager, setManager] = useState(null);
  // eslint-disable-next-line
  const [WorkPlace, setWorkPlace] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const token = document.cookie.split('=')[1];
    onAuthStateChanged(token).then((res) => {
      if (res) {
        setManager(res.data.data);
        setLoading(false);
      } else {
        navigate('/login', { replace: true });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Manager?.email) {
      getRequest(`workPlace/${Manager.email}`).then((response) => {
        setWorkPlace(response);
      });
    }
  }, [Manager]);

  return (
    <>
      <Helmet>
        <title> Dashboard | WM </title>
      </Helmet>

      {Loading ? (
        <Stack
          maxWidth="xl"
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          sx={{ height: '100%' }}
          spacing={2}
          direction="row"
        >
          <CircularProgress />
        </Stack>
      ) : (
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5 }}>
            {` Hi, Welcome back ${Manager?.name}`}
          </Typography>

          <Grid container spacing={3}>
            {ShortReport.map((item, index) => (
              <Grid key={index} item xs={12} sm={6} md={3}>
                <AppWidgetSummary title={item.title} total={item.total} icon={item.icon} color={item.color} />
              </Grid>
            ))}

            <Grid item xs={12} md={12} lg={12}>
              <AppLinkGeneratorTaskEnforcer WorkPlace={WorkPlace} />
            </Grid>

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
      )}
    </>
  );
}
