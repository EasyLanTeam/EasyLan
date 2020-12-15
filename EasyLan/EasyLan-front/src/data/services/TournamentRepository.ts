import ITournamentService from "./ITournamentService";
import { Tournament } from "../entities/Tournament";
import {
  ApiError,
  ApiFailureResult,
  ApiResult,
  ApiSuccessResult,
} from "./ApiResult";

// const tournaments: Array<Tournament> = [
//   {
//     id: "t1",
//     organizerId: "o1",
//     organizerFullname: "username",
//     datetime: new Date(2020, 11, 20, 14),
//     location: "Екатеринбург, Первомайская, 28",
//     game: "DOTA 2",
//     type: "team",
//     gameFormat: "5x5",
//     minParticipants: 8,
//     maxParticipants: 32,
//     prizes: ["10000 р", "5000 р", "2500 р"],
//     fee: 500,
//     addditionalInfo: "...",
//   },
//   {
//     id: "t2",
//     organizerId: "o2",
//     organizerFullname: "Cyber Club",
//     datetime: new Date(2020, 11, 22, 17),
//     location: "Екатеринбург, Первомайская, 28",
//     game: "PUBG",
//     type: "single",
//     gameFormat: "",
//     minParticipants: 8,
//     maxParticipants: 24,
//     prizes: [],
//     fee: 0,
//   },
//   {
//     id: "t3",
//     organizerId: "o3",
//     organizerFullname: "username",
//     datetime: new Date(2020, 12, 18, 18),
//     location: "Екатеринбург, Первомайская, 28",
//     game: "DOTA 2",
//     type: "team",
//     gameFormat: "5x5",
//     minParticipants: 8,
//     maxParticipants: 32,
//     prizes: ["Игровая консоль Playstation 4 или Смартфон Xiaomi Redmi Note 9"],
//     fee: 500,
//   },
// ];

const getTournamentFromApi = (tournamentFromApi: Tournament) => {
  const datetime = new Date(tournamentFromApi.datetime);
  datetime.setTime(
    datetime.getTime() + -datetime.getTimezoneOffset() * 60 * 1000
  );
  tournamentFromApi.datetime = datetime;

  return tournamentFromApi;
};

export default class TournamentRepository implements ITournamentService {
  getTournaments(
    pageNumber = 1,
    pageSize = 12
  ): Promise<ApiResult<Array<Tournament>>> {
    return new Promise<ApiResult<Array<Tournament>>>((resolve, reject) => {
      fetch(`/api/Tournament?PageNumber=${pageNumber}&PageSize=${pageSize}`, {
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
        .then((tournaments: Tournament[]) =>
          resolve(
            ApiSuccessResult(
              tournaments.map((t: Tournament) => getTournamentFromApi(t))
            )
          )
        );
    }).then(
      (successResult: ApiSuccessResult<Array<Tournament>>) => successResult,
      (error: ApiFailureResult) => error
    );
  }

  getTournamentById(id: string): Promise<ApiResult<Tournament>> {
    return new Promise<ApiResult<Tournament>>((resolve, reject) => {
      fetch(`/api/Tournament/${id}`, {
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

          return res
            .json()
            .then((t) => resolve(ApiSuccessResult(getTournamentFromApi(t))));
        })
        .catch((e) => {
          console.error(e);
          return reject(ApiError("Ошибка клиента"));
        });
    }).then(
      (successResult: ApiSuccessResult<Tournament>) => successResult,
      (error: ApiFailureResult) => error
    );
  }

  addTournament(tournament: Tournament): Promise<ApiResult<void>> {
    return new Promise<ApiResult<void>>((resolve, reject) => {
      fetch("/api/Tournament", {
        method: "POST",
        body: JSON.stringify(tournament),
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

          return resolve(ApiSuccessResult());
        })
        .catch((e) => {
          console.error(e);
          return reject(ApiError("Ошибка клиента"));
        });
    }).then(
      (successResult: ApiSuccessResult<void>) => successResult,
      (error: ApiFailureResult) => error
    );
  }

  updateTournament(tournament: Tournament): Promise<ApiResult<void>> {
    return new Promise<ApiResult<void>>((resolve, reject) => {
      fetch(`/api/Tournament/${tournament.id}`, {
        method: "PUT",
        body: JSON.stringify(tournament),
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

          return resolve(ApiSuccessResult());
        })
        .catch((e) => {
          console.error(e);
          return reject(ApiError("Ошибка клиента"));
        });
    }).then(
      (successResult: ApiSuccessResult<void>) => successResult,
      (error: ApiFailureResult) => error
    );
  }

  deleteTournament(tournamentId: string): Promise<ApiResult<void>> {
    return new Promise<ApiResult<void>>((resolve, reject) => {
      fetch(`/api/Tournament/${tournamentId}`, {
        method: "DELETE",
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

          return resolve(ApiSuccessResult());
        })
        .catch((e) => {
          console.error(e);
          return reject(ApiError("Ошибка клиента"));
        });
    }).then(
      (successResult: ApiSuccessResult<void>) => successResult,
      (error: ApiFailureResult) => error
    );
  }

  takePartition(tournamentId: string): Promise<ApiResult<void>> {
    return new Promise<ApiResult<void>>((resolve, reject) => {
      fetch(`/api/Tournament/TakePart/${tournamentId}`, {
        method: "POST",
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

          return resolve(ApiSuccessResult());
        })
        .catch((e) => {
          console.error(e);
          return reject(ApiError("Ошибка клиента"));
        });
    }).then(
      (successResult: ApiSuccessResult<void>) => successResult,
      (error: ApiFailureResult) => error
    );
  }

  startTournament(tournamentId: string): Promise<ApiResult<void>> {
    return new Promise<ApiResult<void>>((resolve, reject) => {
      fetch(`/api/Tournament/Start/${tournamentId}`, {
        method: "POST",
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

          return resolve(ApiSuccessResult());
        })
        .catch((e) => {
          console.error(e);
          return reject(ApiError("Ошибка клиента"));
        });
    }).then(
      (successResult: ApiSuccessResult<void>) => successResult,
      (error: ApiFailureResult) => error
    );
  }
}
