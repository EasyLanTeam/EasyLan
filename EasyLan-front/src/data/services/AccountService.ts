import { RegistrationData } from "../entities/RegistrationData";
import { UserData } from "../entities/UserData";
import {
  ApiError,
  ApiFailureResult,
  ApiResult,
  ApiSuccessResult,
} from "./ApiResult";
import IAccountService from "./IAccountService";

export default class AccountService implements IAccountService {
  get(): Promise<ApiResult<UserData>> {
    return new Promise<ApiResult<UserData>>((resolve, reject) => {
      fetch("/api/Account", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        mode: "cors",
      })
        .then((res) => {
          if (res.status === 401) {
            return reject(ApiError("UNAUTHORIZED"));
          }

          if (res.status !== 200) {
            return reject(ApiError(`Ошибка сервера, ${res.status}`));
          }

          return res.json();
        })
        .catch((e) => {
          console.error(e);
          return reject(ApiError("Ошибка клиента"));
        })
        .then((userData: UserData) => {
          return resolve(ApiSuccessResult(userData));
        });
    }).then(
      (successResult: ApiSuccessResult<UserData>) => successResult,
      (error: ApiFailureResult) => error
    );
  }
  getUserData(id: string): Promise<ApiResult<UserData>> {
    return new Promise<ApiResult<UserData>>((resolve, reject) => {
      fetch(`/api/Account/GetUserData?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        mode: "cors",
      })
        .then((res) => {
          if (res.status !== 200) {
            return reject(ApiError(`Ошибка сервера, ${res.status}`));
          }

          return res.json();
        })
        .catch((e) => {
          console.error(e);
          return reject(ApiError("Ошибка клиента"));
        })
        .then((userData: UserData) => {
          return resolve(ApiSuccessResult(userData));
        });
    }).then(
      (successResult: ApiSuccessResult<UserData>) => successResult,
      (error: ApiFailureResult) => error
    );
  }

  create(data: RegistrationData): Promise<ApiResult<unknown>> {
    return fetch("/api/Account/Create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      mode: "cors",
    })
      .then((res) => {
        if (res.status === 400) {
          return ApiError("LOGIN_ALREADY_USE");
        }
        if (res.status !== 200) {
          return ApiError(`Ошибка сервера, ${res.status}`);
        }

        return ApiSuccessResult();
      })
      .catch((e) => {
        console.error(e);
        return ApiError("Ошибка клиента");
      })
      .then((res) => res);
  }

  login(username: string, password: string): Promise<ApiResult<UserData>> {
    return new Promise<ApiResult<UserData>>((resolve, reject) => {
      fetch(
        `/api/Account/Login?userLogin=${username}&userPassword=${password}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
          mode: "cors",
        }
      )
        .then((res) => {
          if (res.status === 401) {
            return reject(ApiError("UNAUTHORIZED"));
          }
          if (res.status !== 200) {
            return reject(ApiError(`Ошибка сервера, ${res.status}`));
          }

          return res.json();
        })
        .then((userData: UserData) => {
          resolve(ApiSuccessResult(userData));
        })
        .catch((e) => {
          console.error(e);
          return reject(ApiError("Ошибка клиента"));
        });
    }).then(
      (successResult: ApiSuccessResult<UserData>) => successResult,
      (error: ApiFailureResult) => error
    );
  }

  logout(): Promise<ApiResult<unknown>> {
    return fetch("/api/Account/LogoutUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      mode: "cors",
    })
      .then((res) => {
        if (res.status === 400) {
          return ApiError("LOGOUT_ERROR");
        }
        if (res.status !== 200) {
          return ApiError(`Ошибка сервера, ${res.status}`);
        }

        return ApiSuccessResult();
      })
      .catch((e) => {
        console.error(e);
        return ApiError("Ошибка клиента");
      });
  }

  changePassword(
    newPassword: string,
    oldPassword: string
  ): Promise<ApiResult<unknown>> {
    return fetch(
      `/api/Account/ChangePassword?=newPassword=${newPassword}&oldPassword=${oldPassword}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        mode: "cors",
      }
    )
      .then((res) => {
        if (res.status !== 200) {
          return ApiError(`Ошибка сервера, ${res.status}`);
        }

        return ApiSuccessResult();
      })
      .catch((e) => {
        console.error(e);
        return ApiError("Ошибка клиента");
      });
  }
}
