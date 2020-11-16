import { Tournament } from "./Tournament";

const tournaments: Array<Tournament> = [
  {
    id: "t1",
    organizerId: "o1",
    organizerFullname: "username",
    datetime: new Date(2020, 11, 20, 14),
    location: "Екатеринбург, Первомайская, 28",
    game: "DOTA 2",
    type: "team",
    gameFormat: "5x5",
    minParticipants: 8,
    maxParticipants: 32,
    prizes: ["10000 р", "5000 р", "2500 р"],
    fee: 500,
    addditionalInfo: "...",
  },
  {
    id: "t2",
    organizerId: "o2",
    organizerFullname: "Cyber Club",
    datetime: new Date(2020, 11, 22, 17),
    location: "Екатеринбург, Первомайская, 28",
    game: "PUBG",
    type: "single",
    gameFormat: "",
    minParticipants: 8,
    maxParticipants: 24,
    prizes: [],
    fee: 0,
  },
  {
    id: "t3",
    organizerId: "o3",
    organizerFullname: "username",
    datetime: new Date(2020, 12, 18, 18),
    location: "Екатеринбург, Первомайская, 28",
    game: "DOTA 2",
    type: "team",
    gameFormat: "5x5",
    minParticipants: 8,
    maxParticipants: 32,
    prizes: ["Игровая консоль Playstation 4 или Смартфон Xiaomi Redmi Note 9"],
    fee: 500,
  },
];

export default class TournamentRepository {
  getAllTournaments(): Array<Tournament> {
    return tournaments;
  }

  addTournament(tournament: Tournament) {
    tournaments.push(tournament);
  }
}
