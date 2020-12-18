import { LocationData } from "./LocationData";

export type PlayerProfileData = {
  id: string;
  playerId: string;
  location: LocationData;
  additionalInfo: string;
  tournamentsCount: number;
  avatar: string;
}
