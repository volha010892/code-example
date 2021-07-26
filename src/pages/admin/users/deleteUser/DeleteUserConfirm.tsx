import React, { useState } from 'react';
import {
  Button, DialogActions, DialogTitle, Grid,
} from '@material-ui/core';
import UserService from '../../services/user.service';
import Toasters from '../../components/popUp/PopUp';
import Loader from '../../components/loader/Loader';
import useStyles from './DeleteUser.style';
import { EmptyVoidFunction } from '../../utils/types';

const defaultProps = {
  handleClose: () => {},
};

function DeleteUserConfirm(props: {
  handleClose?: EmptyVoidFunction;
  id: string;
  getUsers: EmptyVoidFunction;
}) {
  const { handleClose, id, getUsers } = props;
  const [loader, setLoader] = useState(false);
  const classes = useStyles();

  const deleteUser = async () => {
    setLoader(true);
    const response = await UserService.delete(id);
    if (response) {
      Toasters.success('Пользователь успешно удален');
    }
    if (handleClose) {
      handleClose();
    }
    getUsers();
    setLoader(false);
  };

  if (loader) {
    return (
      <Grid className={classes.loadingWindow}>
        <Loader />
      </Grid>
    );
  }
  return (
    <>
      <DialogTitle>
        Вы действительно хотите удалить пользователя?
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Oтмена
        </Button>
        <Button onClick={deleteUser} color="primary" autoFocus>
          Удалить
        </Button>
      </DialogActions>
    </>
  );
}

export default DeleteUserConfirm;

DeleteUserConfirm.defaultProps = defaultProps;