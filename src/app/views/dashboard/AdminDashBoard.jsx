import React from 'react'
import { Card, Grid, styled, useTheme } from '@mui/material';
import { Fragment } from 'react';
import DoughnutChart from './shared/Doughnut';
import StatCards from './shared/StatCards';
import AdminUpgradeCard from './shared/AdminUpgradeCard';
import AdminTopSellingTable from './shared/AdminTopSellingTable';
import AdminStatCards from './AdminStatCards';


function AdminDashBoard() {
  const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    paddingBottom: '40px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
  }));
  
  const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    marginRight: '.5rem',
    textTransform: 'capitalize',
  }));
  
  const SubTitle = styled('span')(({ theme }) => ({
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
  }));
  
  const H4 = styled('h4')(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '16px',
    textTransform: 'capitalize',
    color: theme.palette.text.secondary,
  }));



  const { palette } = useTheme();
  return (
    <Fragment className='dashboard'>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            {/* <StatCards /> */}
            {/* <AdminUpgradeCard /> */}
            <AdminTopSellingTable />
            {/* <StatCards2 /> */}
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <Title>CGPA Records</Title>
              <SubTitle>Last 4 years</SubTitle>

              <DoughnutChart
                height="340px"
                color={[palette.primary.dark, palette.primary.main, palette.primary.light]}
              />
            </Card>

            {/* <AdminStatCards /> */}
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  )
}

export default AdminDashBoard