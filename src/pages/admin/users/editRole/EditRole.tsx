import React, { useState, useEffect } from 'react';
import { Checkbox, Grid } from '@material-ui/core';
import UserService from '../../services/user.service';
import Toasters from '../../components/popUp/PopUp';
import useStyles from './EditRole.style';
import Loader from '../../components/loader/Loader';

const defaultProps = {
  isDisable: false,
};

export default function EditRole(props: {
  userId: string;
  userRoles: [string];
  role: string;
  isDisable?: boolean;
  getUsers: Function;
}) {
  const {
    userId, userRoles, role, isDisable, getUsers
  } = props;
  const [checked, setChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const classes = useStyles();

  const data = {
    role,
    id: userId,
  };

  useEffect(() => {
    setChecked(userRoles.includes(role));
  }, [userRoles, role]);

  const sendEditRole = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoader(true);
    const response = event.target.checked
      ? await UserService.addToRole(data)
      : await UserService.removeFromRole(data);
    if (response) {
      Toasters.success('Роль успешно изменена');
      getUsers();
    }
    setLoader(false);
  };
  if (loader) {
    return <Loader />;
  }
  return (
    <Grid className={classes.content}>
      <Checkbox checked={checked} onChange={sendEditRole} disabled={isDisable} />
    </Grid>
  );
}

EditRole.defaultProps = defaultProps;