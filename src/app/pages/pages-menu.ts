import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-person',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'ORGANIZATION',
    group: true,
  },
  {
    title: 'Employees',
    icon: 'nb-person',
    link: '/pages/tables/smart-table',
  },
  {
    title: 'Teams',
    icon: 'nb-grid-b-outline',
    link: '/pages/tables/smart-table',
  },
  {
    title: 'Roles',
    icon: 'nb-e-commerce',
    link: '/pages/tables/smart-table',
  },
  {
    title: 'Computers',
    icon: 'nb-layout-sidebar-left',
    link: '/pages/tables/smart-table',
  },
  {
    title: 'Competence Centers',
    icon: 'nb-location',
    link: '/pages/tables/smart-table',
  },
  {
    title: 'PROJECTS',
    group: true,
  },
  {
    title: 'Projects',
    icon: 'nb-compose',
    link: '/pages/tables/smart-table',
  },
  {
    title: 'Incidents',
    icon: 'nb-shuffle',
    link: '/pages/tables/smart-table',
  },
];
