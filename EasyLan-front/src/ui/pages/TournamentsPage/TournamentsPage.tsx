import * as React from "react";
import Icon from "@mdi/react";
import cn from "classnames";
import { mdiClockTimeThree, mdiCalendar, mdiHumanMale, mdiPlus } from "@mdi/js";
import TournamentRepository from "../../../data/TournamentRepository";
import { Tournament } from "../../../data/Tournament";
import Button from "../../components/base/Button";
import CreateTournamentPage from "../CreateTournamentPage";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

import styles from "./TournamentsPage.style.scss";

interface ITournamentsPageProps {}
interface ITournamentCardProps {
  tournament: Tournament;
}

const tournamentRepo = new TournamentRepository();

const TournamentCard: React.FunctionComponent<ITournamentCardProps> = ({
  tournament,
}: ITournamentCardProps) => {
  const mainPrize = tournament.prizes && tournament.prizes[0];

  return (
    <div className={styles.tournamentCard}>
      <div className={styles.tournamentCardWrapper}>
        <div className={styles.tournamentCardTitle}>
          {tournament.game +
            (tournament.gameFormat ? " – " + tournament.gameFormat : "")}
        </div>
        <div>{mainPrize ? `Главный приз: ${mainPrize}` : "Без призов"}</div>
        <div className={styles.tournamentCardDatetime}>
          <div>
            <Icon
              path={mdiCalendar}
              size={"16px"}
              className={styles.dateIcon}
            ></Icon>
            <span className={styles.dateText}>
              {tournament.datetime.toLocaleDateString()}
            </span>
          </div>
          <div>
            <Icon
              path={mdiClockTimeThree}
              size={"16px"}
              className={styles.timeIcon}
            ></Icon>
            <span className={styles.timeText}>
              {tournament.datetime.toLocaleTimeString().match(/\d{2}:\d{2}/)[0]}
            </span>
          </div>
        </div>
        <div
          className={cn(styles.tournamentCardParticipants, styles.participants)}
        >
          <Icon
            path={mdiHumanMale}
            size="16px"
            className={styles.participantsIcon}
          ></Icon>
          <span className={styles.participantsText}>
            {`${0}/${tournament.maxParticipants}`}
          </span>
        </div>
      </div>
    </div>
  );
};

const TournamentsPage: React.FunctionComponent<ITournamentsPageProps> = (
  props
) => {
  const { path, url } = useRouteMatch();
  const tournamentList = tournamentRepo.getAllTournaments();

  return (
    <Switch>
      <Route path={`${path}/create`} exact>
        <CreateTournamentPage></CreateTournamentPage>
      </Route>
      <Route path={`${path}`}>
        <div className={styles.container}>
          <Link to={`${url}/create`}>
            <Button size={"small"} variant={"primary"} icon={{ path: mdiPlus }}>
              Провести турнир
            </Button>
          </Link>
          <div className={styles.tournamentList}>
            {tournamentList.map((tournament) => {
              return (
                <div key={tournament.id} className={styles.tournamentListItem}>
                  <TournamentCard tournament={tournament}></TournamentCard>
                </div>
              );
            })}
          </div>
        </div>
      </Route>
    </Switch>
  );
};

export default TournamentsPage;
