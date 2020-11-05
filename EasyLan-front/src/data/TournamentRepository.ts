import { Tournament } from "./Tournament";

const tournaments: Array<Tournament> = [
  {
    id: "t1",
    organizer: "username",
    datetime: new Date(2020, 11, 20, 14),
    location: "Екатеринбург, Первомайская, 28",
    game: "DOTA 2",
    type: "Командный",
    gameFormat: "5x5",
    minParticipants: 8,
    maxParticipants: 32,
    prizes: ["10000 р", "5000 р", "2500 р"],
    fee: 500,
    addditionalInfo: "...",
  },
  {
    id: "t2",
    organizer: "Cyber Club",
    datetime: new Date(2020, 11, 22, 17),
    location: "Екатеринбург, Первомайская, 28",
    game: "PUBG",
    type: "Индивидуальный",
    gameFormat: "",
    minParticipants: 8,
    maxParticipants: 24,
  },
  {
    id: "t3",
    organizer: "username",
    datetime: new Date(2020, 12, 18, 18),
    location: "Екатеринбург, Первомайская, 28",
    game: "DOTA 2",
    type: "Командный",
    gameFormat: "5x5",
    minParticipants: 8,
    maxParticipants: 32,
    prizes: ["Игровая консоль Playstation 4 или Смартфон Xiaomi Redmi Note 9"],
    fee: 500,
  },
];

class TournamentRepository {
  getAllTournaments(): Array<Tournament> {
    return tournaments;
  }
}
