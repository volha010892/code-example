import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import UserService from '../services/user.service';
import AdminUser from '../models/users/AdminUser';
import AreatroutTable from '../components/areatrout-table/areatrout-table';
import DeleteUser from './deleteUser/DeleteUser';
import EditRole from './editRole/EditRole';
import { adminRole, organizerRole } from '../constants';
import BlockUser from './users/blockUser/BlockUser';
import useStyles from './adminUsers.style';
import LoaderFullScreen from '../components/loader/LoaderFullScreen';
import DateTimeCell from '../components/areatrout-table/dateTimeCell/DateTimeCell';
import { StorageService } from '../utils/utils';

export default function AdminUsers() {
  const classes = useStyles();

  const [allUsers, setUsers] = useState<Array<AdminUser> | null>([]);
  const [loader, setLoader] = useState(true);
  const [currentUserEmail, setCurrentUserEmail] = useState();

  const getUsers = async () => {
    const response = await UserService.get();

    if (response) {
      response.forEach((user: AdminUser) => {
        user.hasOrganizerRole = user.roles.some((role: string) => role === organizerRole);
        user.hasAdministatorRole = user.roles.some((role: string) => role === adminRole);
      });
      setUsers(response);
    }
    setLoader(false);
  };

  const columns = [
    {
      displayName: 'Дата регистрации',
      fieldName: 'registrationDate',
      render: ({ registrationDate }: AdminUser) => <DateTimeCell date={registrationDate} />,
    },
    {
      displayName: 'Имя',
      fieldName: 'fullName',
    },
    {
      displayName: 'E-mail',
      fieldName: 'email',
      render: ({ email }: AdminUser) => (
        <a href={`mailto:${email}`}>{email}</a>
      ),
    },
    {
      displayName: 'Организатор',
      fieldName: 'hasOrganizerRole',
      allowSearch: false,
      render: ({ id, roles }: AdminUser) => (
        <EditRole userId={id} userRoles={roles} role={organizerRole} getUsers={getUsers} />
      ),
    },
    {
      displayName: 'Администратор',
      fieldName: 'hasAdministatorRole',
      allowSearch: false,
      render: ({ id, roles, email }: AdminUser) => (
        <EditRole userId={id} userRoles={roles} role={adminRole} isDisable={currentUserEmail === email} getUsers={getUsers} />
      ),
    },
    {
      displayName: 'Управление',
      fieldName: 'control',
      allowSortring: false,
      allowSearch: false,
      render: ({
        id, isBlocked, lockoutMessage, email,
      }: AdminUser) => (
        <Grid className={classes.administration}>
          <BlockUser
            userId={id}
            isBlocked={isBlocked}
            getUsers={getUsers}
            lockoutMessage={lockoutMessage}
            isDisable={currentUserEmail === email}
          />
          <DeleteUser id={id} isDisabled={currentUserEmail === email} getUsers={getUsers} />
        </Grid>
      ),
    },
  ];

  useEffect(() => {
    getUsers();
    setCurrentUserEmail(StorageService.getUserData()?.email);
  }, []);

  if (loader) {
    return <LoaderFullScreen />;
  }
  if (allUsers) {
    return <AreatroutTable columns={columns} rows={allUsers} />;
  }
  return (
    <Grid container direction="row" justify="center">
      <h3>Данных нет</h3>
    </Grid>
  );
}