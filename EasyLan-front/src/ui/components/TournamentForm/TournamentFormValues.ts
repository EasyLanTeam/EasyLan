export type TournamentFormValues = {
  id?: string,
  initiatorId: string;
  initiatorFullname: string;
  date: string;
  time: string;
  city: string;
  street: string;
  house: string;
  type: "team" | "single";
  game: string;
  gameFormat: string;
  prize: "yes" | "no";
  prizeCount: number | "";
  prizes: Array<string>;
  minParticipants: number;
  maxParticipants: number;
  fee: number;
  additionalInfo: string;
};
