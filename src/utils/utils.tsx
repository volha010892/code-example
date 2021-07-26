import moment from 'moment';
import AuthorizationUser from '../models/AuthorizationUser';
import { USER_STORAGE_KEY } from '../constants';
import 'moment/locale/ru';

export const intersect = (arr1: Array<string>, arr2: Array<string>) => arr1.filter((entry) => arr2.indexOf(entry) !== -1);

export const hasRolesIntersection = (
  arr: Array<string> | undefined,
  currentUser: AuthorizationUser | undefined,
) => {
  if (arr?.length) {
    if (currentUser) {
      return intersect(arr, currentUser.roles).length > 0;
    }
    return false;
  }
  return true;
};

export const StorageService = {
  getUserData() {
    const storedItem = localStorage.getItem(USER_STORAGE_KEY);
    return storedItem ? JSON.parse(storedItem) : null;
  },

  setUserData(userData: AuthorizationUser) {
    const storedItem = JSON.stringify(userData);
    localStorage.setItem(USER_STORAGE_KEY, storedItem);
  },

  deleteUserData() {
    localStorage.removeItem(USER_STORAGE_KEY);
  },
};

export const transformToDateTime = (date: string) => {
  const transformedDate = moment.utc(date);

  return transformedDate.local().locale('ru').format('L LTS');
};

