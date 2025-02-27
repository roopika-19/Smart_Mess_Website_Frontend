// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
    role: "all",
  },
  {
    title: 'Menu',
    path: '/dashboard/menuPage',
    icon: icon('ic_menu'),
    role: "user",
  },
  {
    title: 'Menu',
    path: '/dashboard/menuPage',
    icon: icon('ic_menu'),
    role: "manager",
  },
  {
    title: 'Feedback',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
    role: "user",
  },
  {
    title: 'Rating',
    path: '/dashboard/ratings',
    icon: icon('ic_blog'),
    role: "user",
  },
  // {
  //   title: 'Attendance',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  //   role: "all",
  // },
  {
    title: 'Edit Food Item',
    path: '/dashboard/addfooditem',
    icon: icon('ic_disabled'),
    role: "manager",
  },
  {
    title: 'View Summary',
    path: '/dashboard/summary',
    icon: icon('ic_summary'),
    role: "manager",
  },
  {
    title:'Analytics',
    path: '/dashboard/analytics',
    icon: icon('ic_charts'),
    role:"user",
  },
  {
    title: 'Add Feedback Form',
    path: '/dashboard/feedback',
    icon: icon('ic_summary'),
    role: "manager",
  },
  {
    title: 'Add Announcement',
    path: '/dashboard/announcement',
    icon: icon('ic_summary'),
    role: "manager",
  }
,{
  title:'Issues',
  path: '/dashboard/suggestions', icon: icon('ic_issues'),role:"user"
}
];

export default navConfig;