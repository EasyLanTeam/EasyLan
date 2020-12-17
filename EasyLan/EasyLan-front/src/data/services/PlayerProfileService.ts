import { PlayerProfileData } from "../entities/PlayerProfileData";
import {
  ApiError,
  ApiFailureResult,
  ApiResult,
  ApiSuccessResult,
} from "./ApiResult";

export default class PlayerProfileService {
  get(): Promise<ApiResult<PlayerProfileData>> {
    return new Promise<ApiResult<PlayerProfileData>>((resolve, reject) => {
      fetch("/api/playerprofile/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        mode: "cors",
      })
        .then((res) => {
          if (res.status === 404) {
            return reject(ApiError("NOT_FOUND"));
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
        .then((playerProfile: PlayerProfileData) => {
          return resolve(ApiSuccessResult(playerProfile));
        });
    }).then(
      (successResult: ApiSuccessResult<PlayerProfileData>) => successResult,
      (error: ApiFailureResult) => error
    );
  }
}
