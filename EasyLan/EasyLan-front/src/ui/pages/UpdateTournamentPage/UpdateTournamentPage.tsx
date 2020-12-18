import * as React from "react";
import { Tournament } from "../../../data/entities/Tournament";
import TournamentRepository from "../../../data/services/TournamentRepository";
import TournamentForm from "../../components/TournamentForm/TournamentForm";
import Paper from "../../components/Paper";
import { notifyError, notifySuccess } from "../../../domain/notify";
import { useHistory } from "react-router-dom";
import { useTournament } from "../../../domain/tournamentContext";
import { TournamentFormValues } from "../../components/TournamentForm/TournamentFormValues";
import dayjs from "dayjs";
import { ApiFailureResult } from "../../../data/services/ApiResult";

interface IUpdateTournamentPageProps {
  tournament: Tournament;
}

const getDate = (date: Date) => dayjs(date).format("YYYY-MM-DD");
const getTime = (date: Date) => {
  return dayjs(date).format("HH:mm");
};
const getTournamentType = (type: number) => {
  if (type === 0) return "single";
  else if (type === 1) return "team";
};

const mapTournamentToFormValues: (
  tournament: Tournament
) => TournamentFormValues = (tournament: Tournament) => {
  const {
    id,
    additionalInfo,
    fee,
    game,
    gameFormat,
    initiatorId,
    initiatorFullname,
    minParticipants,
    maxParticipants,
    location,
    prizes,
    type,
  } = tournament;

  const [city, house, street] = location.split(", ");

  return {
    id,
    additionalInfo,
    fee,
    game,
    gameFormat,
    initiatorId,
    initiatorFullname,
    minParticipants,
    maxParticipants,
    prize: prizes != null ? "yes" : "no",
    prizeCount: prizes == null || prizes.length === 0 ? "" : prizes.length,
    prizes: prizes.sort((p1, p2) => p1.place - p2.place).map((p) => p.prize),
    city,
    house,
    street,
    type: getTournamentType(type),
    date: getDate(tournament.datetime),
    time: getTime(tournament.datetime),
  };
};

const UpdateTournamentPage: React.FunctionComponent<IUpdateTournamentPageProps> = ({
  tournament,
}: IUpdateTournamentPageProps) => {
  const {
    flags: { isEditable },
    updateAllFromServer,
  } = useTournament();
  const history = useHistory();

  const onSubmit = (tournament: Tournament) => {
    if (!isEditable) {
      notifyError("Вы не являетесь организатором. Изменение отклонено");
      return;
    }

    console.log(tournament);

    const rep = new TournamentRepository();
    rep.updateTournament(tournament).then((res) => {
      if (res.success) {
        notifySuccess("Данные турнира успешно изменены");
        history.push(`/tournaments/${tournament.id}`);
      } else {
        const { error } = res as ApiFailureResult;
        notifyError(error.error);
      }

      updateAllFromServer();
    });

    console.log("submit");
  };

  return (
    <Paper>
      <TournamentForm
        onSubmit={onSubmit}
        type="update"
        tournamentFormValues={mapTournamentToFormValues(tournament)}
      />
    </Paper>
  );
};

export default UpdateTournamentPage;
