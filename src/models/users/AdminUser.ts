interface AdminUser {
        id: string;
        registrationDate: string;
        fullName: string;
        email: string;
        roles: [
          string
        ];
        isBlocked: boolean;
        isRemoved: boolean;
        firstName: string;
        lastName: string;
        lockoutMessage: string;
        hasOrganizerRole: boolean;
        hasAdministatorRole: boolean;
      }

export default AdminUser;