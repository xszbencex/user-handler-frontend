import { Roles } from './Roles';

export type UserResponseDTO = {
  id: number;
  username: string;
  email: string;
  roles: Roles[];
};
