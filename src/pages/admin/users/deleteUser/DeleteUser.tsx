import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import DeleteUserConfirm from './DeleteUserConfirm';
import AreatroutModal from '../../components/modal/modal';

type onFunction = () => void;

function DeleteUser(props: {
  id: string;
  getUsers: onFunction;
  isDisabled: boolean;
}) {
  const { id, getUsers, isDisabled } = props;
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  return (
    <>
      <IconButton
        edge="end"
        aria-label="delete"
        disabled={isDisabled}
        onClick={() => setOpenDelete(true)}
      >
        <Delete />
      </IconButton>
      <AreatroutModal
        header="Удалить пользователя"
        open={openDelete}
        setOpen={setOpenDelete}
      >
        <DeleteUserConfirm getUsers={getUsers} id={id} />
      </AreatroutModal>
    </>
  );
}

export default DeleteUser;