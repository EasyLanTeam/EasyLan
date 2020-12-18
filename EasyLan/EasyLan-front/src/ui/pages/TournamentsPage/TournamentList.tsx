import * as React from "react";
import { mdiPlus } from "@mdi/js";
import { Tournament } from "../../../data/entities/Tournament";
import TournamentRepository from "../../../data/services/TournamentRepository";
import Button from "../../components/base/Button";
import { Link, useRouteMatch } from "react-router-dom";
import { useAuth } from "../../../domain/auth/appAuth";
import { TournamentCard } from "./TournamentCard";
import TournamentsPagination from "./TournamentsPagination";
import useQuery from "../../../domain/useQuery";

import styles from "./TournamentsPage.style.scss";

interface ITournamentListProps {}

export const TournamentList: React.FunctionComponent<ITournamentListProps> = () => {
  const [tournamentList, setTournamentList] = React.useState<Tournament[]>(
    null
  );
  const { url } = useRouteMatch();
  const query = useQuery();
  const { user } = useAuth();

  const pageQueryParam = query.get("page");
  const pageNumber = pageQueryParam ? +pageQueryParam : 1;

  React.useEffect(() => {
    let cleanupFunction = false;

    const tournamentRepo = new TournamentRepository();

    tournamentRepo.getTournaments(pageNumber).then((res) => {
      if (!res.success) return;
      const { result: tournaments } = res;

      !cleanupFunction && setTournamentList(tournaments);
    });

    return () => (cleanupFunction = true);
  }, [pageNumber]);

  if (!tournamentList) {
    return null;
  }

  return (
    <div>
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
      <TournamentsPagination currentPageNumber={pageNumber}/>
    </div>
  );
};
