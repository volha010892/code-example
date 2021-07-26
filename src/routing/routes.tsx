import { ComponentType } from 'react';
import AdminUsers from '../pages/AdminUsers';
import { adminRole } from '../constants';
import AdminGuard from '../guards/AdminGuard';

interface RouteValue {
  path: string;
  name: string;
  component: ComponentType;
  rolesAllowed?: string[];
  guards?: any;
}

const Routes: { [key: string]: RouteValue } = {
  AdminUser: {
    path: '/admin/users',
    name: 'Управление пользователями',
    component: AdminUsers,
    rolesAllowed: [adminRole],
    guards: AdminGuard,
  },
};

export default Routes;