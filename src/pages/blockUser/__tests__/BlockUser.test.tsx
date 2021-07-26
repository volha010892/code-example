import React from 'react';
import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import {
  render, fireEvent, cleanup, screen, waitFor
} from '@testing-library/react';
import UserService from '../../../../services/user.service';
import BlockUser from '../BlockUser';
import mockData from '../mocks/mock';

beforeEach(() => jest.restoreAllMocks());
afterEach(cleanup);

const Wrapper = (props: {isBlocked: boolean, isDisable: boolean}) => {
  const { isBlocked, isDisable } = props;
  return (
    <BlockUser
      userId={mockData.userId}
      getUsers={mockData.getUsers}
      isBlocked={isBlocked}
      lockoutMessage={mockData.lockoutMessage}
      isDisable={isDisable}
    />
  );
};

test('open block user modal window', async () => {
  render(<Wrapper isBlocked={false} isDisable={false} />);
  const blockUserButtonsOpenModal = screen.getByTestId('block-user');
  fireEvent.click(blockUserButtonsOpenModal);
  await waitFor(() => {
    expect(screen.getByText('Причина блокировки')).toBeInTheDocument();
  });
});

test('button block user is disabled without lockout message', async () => {
  const mockRequestBlockUser = jest.spyOn(UserService, 'blockUser').mockResolvedValue(null);
  render(<Wrapper isBlocked={false} isDisable={false} />);
  const blockUserButtonsOpenModal = screen.getByTestId('block-user');
  fireEvent.click(blockUserButtonsOpenModal);
  const blockButton = screen.getByTestId('block');
  fireEvent.submit(blockButton);
  await waitFor(() => {
    expect(mockRequestBlockUser).not.toHaveBeenCalled();
  });
});

test('button block user is send a request', async () => {
  const mockRequestBlockUser = jest.spyOn(UserService, 'blockUser').mockResolvedValue(null);
  render(<Wrapper isBlocked={false} isDisable={false} />);
  const blockUserButtonsOpenModal = screen.getByTestId('block-user');
  fireEvent.click(blockUserButtonsOpenModal);
  const blockButton = screen.getByTestId('block');
  fireEvent.input(screen.getByRole('textbox', { name: /Причина блокировки/i }),
    {
      target: {
        value: 'Плохое поведение'
      },
    });
  fireEvent.submit(blockButton);
  await waitFor(() => {
    expect(mockRequestBlockUser).toHaveBeenCalled();
  });
});

test('button unblock user is send a request', async () => {
  const mockRequestBlockUser = jest.spyOn(UserService, 'unBlockUser').mockResolvedValue(null);
  render(<Wrapper isBlocked isDisable={false} />);
  const blockUserButtonsOpenModal = screen.getByTestId('block-user');
  fireEvent.click(blockUserButtonsOpenModal);
  const unBlockButton = screen.getByTestId('block');
  fireEvent.submit(unBlockButton);
  await waitFor(() => {
    expect(mockRequestBlockUser).toHaveBeenCalled();
  });
});

test('user can not block yourself', async () => {
  render(<Wrapper isBlocked={false} isDisable />);
  const blockUserButtonOpenModal = screen.getByTestId('block-user');
  expect(blockUserButtonOpenModal).toBeDisabled();
});