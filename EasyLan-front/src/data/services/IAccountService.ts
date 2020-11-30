import { ApiResult } from "./ApiResult";
import { RegistrationData } from "../entities/RegistrationData";
import { UserData } from "../entities/UserData";

export default interface IAccountService {
  create: (data: RegistrationData) => Promise<ApiResult<unknown>>;
  login: (username: string, password: string) => Promise<ApiResult<UserData>>;
  logout: () => Promise<ApiResult<unknown>>;
  changePassword: (
    newPassword: string,
    oldPassword: string
  ) => Promise<ApiResult<unknown>>;
  getUserData: (id: string) => Promise<ApiResult<UserData>>;
}
