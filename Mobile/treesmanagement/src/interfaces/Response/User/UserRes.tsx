  import { Role } from "../../Enum/Role";
  import { UserAssignment } from "./UserAssignment";

  interface UserRes {
    id: string;
    userName: string;
    fullName: string;
    phone: string | null;
    avatar: string | null;
    dob: Date | null;
    role: Role;
    assignments: UserAssignment[];
  }

  export type { UserRes };
