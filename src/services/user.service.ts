import AdminUser from '../models/AdminUser';
import EditUserRole from '../models/EditUserRole';
import BlockUser from '../models/BlockUser';
import { client, processError } from './http';

const url = '/api/Users';

const options = {
  headers: { 'Content-Type': 'application/json' },
};

async function editRole(data: EditUserRole, editRoleUrl: string) {
  try {
    const response = await client.post<EditUserRole>(
      `${url}/${data.id}/roles/${editRoleUrl}`,
      `"${data.role}"`,
      options,
    );
    return response.data;
  } catch (e) {
    processError(e);
    return null;
  }
}

const UserService = {
  async get() {
    try {
      const response = await client.get<AdminUser[]>(url);
      return response.data;
    } catch (e) {
      processError(e);
      return null;
    }
  },

  async post(user: AdminUser) {
    try {
      const response = await client.post<AdminUser>(url, user);
      return response.data;
    } catch (e) {
      processError(e);
      return null;
    }
  },

  async put(user: AdminUser) {
    try {
      const response = await client.put<AdminUser>(`${url}/${user.id}`, user);
      return response.data;
    } catch (e) {
      processError(e);
      return null;
    }
  },

  async delete(id: string) {
    try {
      const response = await client.delete<AdminUser>(`${url}/${id}`);
      return response.data;
    } catch (e) {
      processError(e);
      return null;
    }
  },

  addToRole(data: EditUserRole) {
    return editRole(data, 'add');
  },
  removeFromRole(data: EditUserRole) {
    return editRole(data, 'remove');
  },

  async blockUser(user: BlockUser) {
    try {
      const response = await client.post<BlockUser>(`${url}/block`, user);
      return response.data;
    } catch (e) {
      processError(e);
      return null;
    }
  },

  async unBlockUser(user: BlockUser) {
    try {
      const response = await client.post<BlockUser>(
        `${url}/unblock`,
        `"${user.userId}"`,
        options,
      );
      return response.data;
    } catch (e) {
      processError(e);
      return null;
    }
  },

  async getCurrentUser() {
    try {
      const response = await client.get<AdminUser>(`${url}/info`);
      return response.data;
    } catch (e) {
      processError(e);
      return null;
    }
  },
};

export default UserService;