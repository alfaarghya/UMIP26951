import { Role } from "./enum";

//navbar props
export interface NavBarProps {
  appName: Role,
  className: string
};

export interface LoginProps {
  role: Role
}
export interface RegistrationProps {
  role: Role
}
export interface UpdatePasswordProps {
  role: Role,
  teacherId?: string
}
