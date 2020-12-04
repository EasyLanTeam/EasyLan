import { Tournament } from "../entities/Tournament";

export default interface ITournamentService {
  getAllTournaments: (
    pageNumber: number,
    pageSize: number
  ) => Promise<Array<Tournament>>;
  getTournamentById: (id: string) => Promise<Tournament>;
  addTournament(tournament: Tournament): Promise<void>;
}
