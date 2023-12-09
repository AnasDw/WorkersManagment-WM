import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@mui/material';
import { faker } from '@faker-js/faker';

import { useTheme } from '@mui/material/styles';

import { AppCurrentVisits, AppNewsUpdate } from '../../../../DashboardComponent/Apps/@dashboard/app';

const FeaturedCharts = ({ data }) => {
  const theme = useTheme();
  return (
    <Grid container spacing={3} paddingX={4} mt={8}>
      <Grid item xs={12} md={6} lg={4}>
        <AppCurrentVisits
          title="Positions Distribution By Departments"
          chartData={data.Positions.map((pos) => ({ label: pos.Dep, value: pos.Pos.length }))}
          chartColors={[
            theme.palette.primary.main,
            theme.palette.success.main,
            theme.palette.error.main,
            theme.palette.warning.main,
          ]}
        />
      </Grid>
      <Grid item xs={12} md={12} lg={8}>
        <AppNewsUpdate
          title="News Update"
          list={[...Array(5)].map((_, index) => ({
            id: faker.datatype.uuid(),
            title: faker.name.jobTitle(),
            description: faker.name.jobTitle(),
            image: `/assets/images/covers/cover_${index + 1}.jpg`,
            postedAt: faker.date.recent(),
          }))}
        />
      </Grid>
    </Grid>
  );
};

FeaturedCharts.propTypes = { data: PropTypes.object };
export default FeaturedCharts;
