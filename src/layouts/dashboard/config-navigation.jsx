import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'accounts',
    path: '/accounts',
    icon: icon('user-accounts'),
  },
  // {
  //   title: 'Calendar',
  //   path: '/calendar',
  //   icon: icon('calendar'),
  // },
  
  {
    title: 'Posts',
    path: '/posts',
    icon: icon('posts'),
  },
  {
    title: 'Scheduled/Failed',
    path: '/posts/scheduled-failed',
    icon: icon('posts'),
  },
  // {
  //   title: 'Media',
  //   path: '/media',
  //   icon: icon('album'),
  // },
  // {
  //   title: 'Publish to Tiktok',
  //   path: '/tiktok/postupload',
  //   icon: icon('ic_tiktok'),
  // },
];

export default navConfig;
 