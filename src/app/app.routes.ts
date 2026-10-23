import { Routes } from '@angular/router';

const brand = 'Sabari Praveen';

export const routes: Routes = [
  {
    path: '',
    title: `${brand} | Portfolio`,
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'hire',
    title: `Hire Me | ${brand}`,
    loadComponent: () => import('./pages/hire/hire').then((m) => m.Hire),
  },
  {
    path: 'about',
    title: `About | ${brand}`,
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
  },
  {
    path: 'services',
    title: `Services | ${brand}`,
    loadComponent: () => import('./pages/services/services-page').then((m) => m.ServicesPage),
  },
  {
    path: 'projects',
    title: `Projects | ${brand}`,
    loadComponent: () => import('./pages/projects/projects-page').then((m) => m.ProjectsPage),
  },
  {
    path: 'projects/:slug',
    title: `Project | ${brand}`,
    loadComponent: () => import('./pages/project-detail/project-detail').then((m) => m.ProjectDetail),
  },
  {
    path: 'contact',
    title: `Contact | ${brand}`,
    loadComponent: () => import('./pages/contact/contact-page').then((m) => m.ContactPage),
  },
  {
    path: '**',
    title: `Not found | ${brand}`,
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
