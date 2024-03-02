import { Role } from "../enums/roles";

export interface SignInRequestPayload {
  userEmail: string;
  userPassword: string;
}

export interface SignUpRequestPayload {
  userName: string;
  userEmail: string;
  userPassword: string;
  roles: Role[];
}
