
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import apiCall from 'src/utils/api';
import toast from 'react-hot-toast';

export default function AppView() {
  const user = useSelector(state => state.auth.user);
  const [userStats,setuserStats]=useState([]);
 
  useEffect(() => {
    (async () => {
      if (user) {
        const uri = `${import.meta.env.VITE_BASE_BACKEND_URL}postdetails`;
        try {
          const response = await apiCall("POST", uri, {
            userId: user._id,
          });

          if(response.status==true){
            const stateData={
              totalPosts:response.total,
              posted:response.posted,
              schedule:response.schedule,
              failed:response.failed,
            }
            setuserStats(stateData)
          }
          else{
            const stateData={
              totalPosts:0,
              posted:0,
              schedule:0,
              failed:0,
            }
            setuserStats(stateData)
          }
         
          // Handle the response here
        } 
        catch (error) {
         toast.error("Something went wrong while fetching user actitvities");
        }
      }
    })();
  }, [user]); 

  return (
    <Container maxWidth="xl" sx={{ height: '100%', overflow: 'hidden' }}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>
      <Grid container spacing={3} sx={{ height: '100%' }}>
      <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Posts"
            total={userStats?.totalPosts}
            color="info"
            spacing={5}
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Posted"
            total={userStats?.posted}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          /> 
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Scheduled Posts"
            total={userStats?.schedule}
            // total={userStats?.scheduled==0?1:0}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/clock-color-icon.svg" />}
          />
        </Grid> 
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Failed Posts"
            total={userStats?.failed}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/red-x-icon.svg" />}
          />
        </Grid>
        
{/* 
        <Grid xs={12} md={6} lg={8}> 
          <AppWebsiteVisits
            title="Total Posts"
            chart={{
              labels: [
                '01/01/2024',
                '02/01/2024',
                '03/01/2024',
                '04/01/2024',
                '05/01/2024',
                '06/01/2024',
                '07/01/2024',
              ],
              series: [
                {
                  name: 'Total Posts',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37],
                },
                {
                  name: 'Pending Posts',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21],
                },
                {
                  name: 'Scheduled Posts',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64],
                },
                {
                  name: 'Weekly Posts',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64],
                },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Current Insights"
            chart={{
              series: [           
                { label: 'Total Posts', value: 4344 },
                { label: 'Pending Posts', value: 5435 },
                { label: 'Scheduled Posts', value: 1443 },
                { label: 'Weekly Posts', value: 4443 },
              ],
            }}
          />
        </Grid> */}
      </Grid>
    </Container>
  ); 
}


 {/* <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [ 
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
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

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}