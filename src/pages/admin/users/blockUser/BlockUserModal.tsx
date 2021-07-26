import React, { useState } from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import UserService from '../../services/user.service';
import BlockUser from '../../models/BlockUser';
import Toasters from '../../components/popUp/PopUp';
import useStyles from './BlockUser.style';
import Loader from '../../components/loader/Loader';
import { EmptyVoidFunction } from '../../utils/types';

const defaultProps = {
  handleClose: () => {},
};

export default function AddOrEditCountryModal(props: {
  isBlockedText: string;
  isBlocked: boolean;
  userId: string;
  lockoutMessage: string | null;
  handleClose?: EmptyVoidFunction;
}) {
  const {
    isBlockedText, isBlocked, userId, lockoutMessage, handleClose,
  } = props;
  const classes = useStyles();
  const [loader, setLoader] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<BlockUser>({
    mode: 'onBlur',
  });

  const sendRequest = async (data: BlockUser) => {
    const result = { ...data };
    result.userId = userId;
    setLoader(true);
    const response = isBlocked
      ? await UserService.unBlockUser(result)
      : await UserService.blockUser(result);
    if (response) {
      Toasters.success(
        `Пользователь успешно ${isBlocked ? 'разблокирован' : 'заблокирован'}`,
      );
    }
    if (handleClose) {
      handleClose();
    }
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
    <form onSubmit={handleSubmit(sendRequest)} className={classes.root}>
      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            inputProps={{ readOnly: !!lockoutMessage }}
            className={classes.content}
            id="outlined-multiline-static"
            label="Причина блокировки"
            multiline
            rows={4}
            variant="outlined"
            required
            autoFocus
          />
        )}
        name="message"
        control={control}
        defaultValue={lockoutMessage || ''}
      />
      <Button
        type="submit"
        data-testid="block"
        variant="contained"
        color="primary"
        className={classes.content}
        disabled={!isBlocked && (!isDirty || !isValid)}
      >
        {isBlockedText}
      </Button>
    </form>
  );
}

AddOrEditCountryModal.defaultProps = defaultProps;