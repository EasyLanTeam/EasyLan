import * as React from "react";
import Icon from "@mdi/react";
import cn from "classnames";
import { mdiClockTimeThree, mdiCalendar, mdiHumanMale, mdiPlus } from "@mdi/js";
import { Tournament } from "../../../data/entities/Tournament";
import TournamentRepository from "../../../data/services/TournamentRepository";
import Button from "../../components/base/Button";
import CreateTournamentPage from "../CreateTournamentPage";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import TournamentPage from "../TournamentPage";

import styles from "./TournamentsPage.style.scss";
import { PrivateRoute } from "../../components/PrivateRoute/PrivateRoute";
import { useAuth } from "../../../domain/auth/appAuth";

interface ITournamentsPageProps {}
interface ITournamentListProps {}
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

let tournamentList: Tournament[] = null;

const TournamentList: React.FunctionComponent<ITournamentListProps> = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { url } = useRouteMatch();
  const { user } = useAuth();

  if (!isLoaded) {
    tournamentRepo.getAllTournaments().then((tournaments) => {
      tournamentList = tournaments.map((t) => {
        t.datetime = new Date(t.datetime);

        return t;
      });

      setIsLoaded(true);
    });

    return null;
  }

  return (
    <div className={styles.container}>
      {user && user.role && user.role !== "user" ? (
        <Link to={`${url}/create`}>
          <Button size={"small"} variant={"primary"} icon={{ path: mdiPlus }}>
            Провести турнир
          </Button>
        </Link>
      ) : null}
      <div className={styles.tournamentList}>
        {tournamentList.map((tournament) => {
          return (
            <div key={tournament.id} className={styles.tournamentListItem}>
              <Link
                to={`${url}/${tournament.id}`}
                className={styles.tournamentListLink}
              >
                <TournamentCard tournament={tournament}></TournamentCard>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TournamentsPage: React.FunctionComponent<ITournamentsPageProps> = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}`} exact>
        <TournamentList />
      </Route>
      <PrivateRoute roles={["initiator"]} path={`${path}/create`}>
        <CreateTournamentPage></CreateTournamentPage>
      </PrivateRoute>
      <Route path={`${path}/:tournamentId`}>
        <TournamentPage></TournamentPage>
      </Route>
    </Switch>
  );
};

export default TournamentsPage;
