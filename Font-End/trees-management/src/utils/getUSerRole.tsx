import { Role } from "../interfaces/Enum/Role"; 

export const getUserRoleName = (role: Role): string => {
  switch (role) {
    case Role.Admin:
      return 'Admin';
    case Role.Manager:
      return 'Manager';
    case Role.Staff:
      return 'Staff';
    default:
      return 'Unknown Role';
  }
};