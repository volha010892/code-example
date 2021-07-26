import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { Lock, LockOpen } from '@material-ui/icons';
import AreatroutModal from '../../../components/modal/modal';
import BlockUserModal from './BlockUserModal';

type onFunction = () => void;

export default function BlockUser(props: {
  userId: string;
  getUsers: onFunction;
  isBlocked: boolean;
  lockoutMessage: string;
  isDisable: boolean;
}) {
  const {
    userId, getUsers, isBlocked, lockoutMessage, isDisable
  } = props;
  const [open, setOpen] = useState(false);
  const isBlockedText = isBlocked ? 'Разблокировать' : 'Заблокировать';
  const isBlockedIcon = isBlocked ? <LockOpen /> : <Lock />;

  return (
    <>
      <IconButton
        edge="end"
        data-testid="block-user"
        aria-label="block"
        disabled={isDisable}
        onClick={() => setOpen(true)}
      >
        {isBlockedIcon}
      </IconButton>
      <AreatroutModal
        header={isBlockedText}
        open={open}
        setOpen={setOpen}
        onClose={getUsers}
      >
        <BlockUserModal
          isBlockedText={isBlockedText}
          isBlocked={isBlocked}
          userId={userId}
          lockoutMessage={lockoutMessage}
        />
      </AreatroutModal>
    </>
  );
}