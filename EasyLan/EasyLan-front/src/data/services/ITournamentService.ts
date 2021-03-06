import { string } from "yup";
import { Tournament } from "../entities/Tournament";
import { ApiResult } from "./ApiResult";

export default interface ITournamentService {
  getTournaments: (
    pageNumber: number,
    pageSize: number
  ) => Promise<ApiResult<Array<Tournament>>>;
  getAllTournamentsByUser: () => Promise<Array<Tournament>>;
  getTournamentById: (id: string) => Promise<ApiResult<Tournament>>;
  addTournament(tournament: Tournament): Promise<ApiResult<void>>;
  takePartition: (tournamentId: string) => Promise<ApiResult<void>>;
  undoTakePartition: (tournamentId: string) => Promise<ApiResult<void>>;
  startTournament: (tournamentId: string) => Promise<ApiResult<void>>;
  finishTournament: (tournamentId: string) => Promise<ApiResult<void>>;
  // eslint-disable-next-line semi
}
