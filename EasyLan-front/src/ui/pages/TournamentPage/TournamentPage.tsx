import * as React from "react";
import { NavLink, Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import PageMenu from "../../components/PageMenu";
import Paper from "../../components/Paper";
import { Tournament } from "../../../data/entities/Tournament";
import TournamentRepository from "../../../data/services/TournamentRepository";
import Button from "../../components/base/Button";
import { mdiClose, mdiPencil } from "@mdi/js";
import TournamentGrid from "./TournamentGrid";

import styles from "./TournamentPage.style.scss";

const tournamentsRepository = new TournamentRepository();

interface ITournamentsPageProps {}
interface ITournamentMainProps {
  tournament: Tournament;
}

const TournamentMain: React.FunctionComponent<ITournamentMainProps> = ({
  tournament,
}: ITournamentMainProps) => {
  return (
    <Paper className={styles.paper}>
      <div className={styles.info}>
        <div className={styles.infoHeader}>
          <div className={styles.infoUsername}>{`${tournament.game}`}</div>
          <div className={styles.infoRating}>{`${tournament.gameFormat}`}</div>
        </div>
        <div className={styles.infoBody}>
          <div>{`Организатор: ${tournament.initiatorFullname}`}</div>
          <div>
            <div>{"Адрес проведения:"}</div>
            <div>{tournament.location}</div>
          </div>
          <div>
            <div>{"Время проведения:"}</div>
            <span>{new Date(tournament.datetime).toLocaleDateString()}</span>
            <span>{"  "}</span>
            <span>
              {
                new Date(tournament.datetime)
                  .toLocaleTimeString()
                  .match(/\d{2}:\d{2}/)[0]
              }
            </span>
          </div>
          {tournament.prizes ? (
            <div>
              {tournament.prizes
                .sort((p) => p.place)
                .map((p) => (
                  <div key={`prize-${p.place}`}>
                    <div>{`Приз за ${p.place}-е место: `}</div>
                    <div>{p.prize}</div>
                  </div>
                ))}
            </div>
          ) : (
            <div>Без призов</div>
          )}
          {tournament.fee !== 0 && (
            <div>
              <div>{"Взнос за участие:"}</div>
              <div>{`${tournament.fee} рублей`}</div>
            </div>
          )}
          {tournament.addditionalInfo && (
            <div>
              <div>{"Дополнительная информация:"}</div>
              <div>{tournament.addditionalInfo}</div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.tournamentMainActions}>
        <Button
          variant={"primary"}
          className={styles.tournamentMainActionsButton}
        >
          Начать турнир
        </Button>
        <Button
          icon={{ path: mdiPencil }}
          className={styles.tournamentMainActionsButton}
        >
          Внести изменения
        </Button>
        <Button
          icon={{ path: mdiClose }}
          className={styles.tournamentMainActionsButton}
        >
          Отменить турнир
        </Button>
      </div>
    </Paper>
  );
};

let tournament: Tournament = null;

const TournamentPage: React.FunctionComponent<ITournamentsPageProps> = (
  props
) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { path, url } = useRouteMatch();
  const { tournamentId } = useParams<{ tournamentId: string }>();

  if (!isLoaded) {
    tournamentsRepository.getTournamentById(tournamentId).then((t) => {
      tournament = t;
      setIsLoaded(true);
    });

    return null;
  }

  return (
    <div className={styles.container}>
      <PageMenu>
        {/* <NavLink to={`${url}`}> */}
        <PageMenu.Item active>Основное</PageMenu.Item>
        {/* </NavLink> */}
        {/* <NavLink to={`${url}/participants`}> */}
        <PageMenu.Item>Список участников</PageMenu.Item>
        {/* </NavLink> */}
        {/* <NavLink to={`${url}/grid`}> */}
        <PageMenu.Item>Турнирная сетка</PageMenu.Item>
        {/* </NavLink> */}
      </PageMenu>
      <Switch>
        <Route path={url} exact>
          <TournamentMain tournament={tournament} />
        </Route>
        <Route path={`${url}/grid`}>
          <TournamentGrid />
        </Route>
      </Switch>
    </div>
  );
};

export default TournamentPage;
