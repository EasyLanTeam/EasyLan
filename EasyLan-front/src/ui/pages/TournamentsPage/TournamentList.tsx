import * as React from "react";
import { mdiPlus } from "@mdi/js";
import { Tournament } from "../../../data/entities/Tournament";
import TournamentRepository from "../../../data/services/TournamentRepository";
import Button from "../../components/base/Button";
import { Link, useRouteMatch } from "react-router-dom";
import { useAuth } from "../../../domain/auth/appAuth";
import { TournamentCard } from "./TournamentCard";

import styles from "./TournamentsPage.style.scss";

interface ITournamentListProps {}

const tournamentRepo = new TournamentRepository();

let tournamentList: Tournament[] = null;

export const TournamentList: React.FunctionComponent<ITournamentListProps> = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { url } = useRouteMatch();
  const { user } = useAuth();

  if (!isLoaded) {
    tournamentRepo.getTournaments().then((res) => {
      if (!res.success) return;
      const { result: tournaments } = res;
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
