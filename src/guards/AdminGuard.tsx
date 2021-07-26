import { StorageService, hasRolesIntersection } from '../utils/utils';
import { adminRole } from '../constants';

const AdminGuard = (to: any, from: any, next: any) => {
  const isAllowed = hasRolesIntersection(
    [adminRole],
    StorageService.getUserData(),
  );

  if (isAllowed) {
    next();
  } else {
    throw new Error('Navigation was prevented in Admin Guard');
  }
};

export default AdminGuard;