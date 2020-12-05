import dayjs from "dayjs";
import { TournamentFormValues } from "./TournamentFormValues";
import { Tournament } from "../../../data/entities/Tournament";

export const tournamentFormValuesMapper = ({
  date: dateStr,
  time: timeStr,
  game,
  gameFormat,
  type,
  prizes,
  maxParticipants,
  minParticipants,
  fee,
  city,
  street,
  house,
  additionalInfo,
  initiatorId,
  initiatorFullname
}: TournamentFormValues) => {
  const [hourStr, minuteStr] = timeStr.split(":");
  const datetime = dayjs(dateStr)
    .set("hour", +hourStr)
    .set("minute", +minuteStr)
    .toDate();
  const location = [city, street, house].join(", ");

  return {
    additionalInfo,
    initiatorId,
    initiatorFullname,
    datetime,
    location,
    type: type === "single" ? 0 : 1,
    game,
    gameFormat,
    prizes: prizes.map((prize, index) => ({
      place: index + 1,
      prize: prize,
    })),
    minParticipants: minParticipants,
    maxParticipants: maxParticipants,
    fee: fee,
  } as Tournament;
};
