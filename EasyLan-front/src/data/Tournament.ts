export type Tournament = {
  id: string;
  organizer: string,
  datetime: Date;
  location: string;
  type: string;
  game: string;
  gameFormat: string;
  prizes?: Array<string>
  minParticipants: number;
  maxParticipants: number;
  fee?: number;
  addditionalInfo?: string
};
