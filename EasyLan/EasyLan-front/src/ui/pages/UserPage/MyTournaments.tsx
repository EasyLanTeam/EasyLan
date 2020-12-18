import * as React from "react";
import { Link } from "react-router-dom";
import { Tournament } from "../../../data/entities/Tournament";
import TournamentRepository from "../../../data/services/TournamentRepository";
import { TournamentCard } from "../TournamentsPage/TournamentCard";

import styles from "../TournamentsPage/TournamentsPage.style.scss";

interface IMyTournamentsProps {}

const MyTournaments: React.FunctionComponent<IMyTournamentsProps> = (props) => {
  const [tournamentList, setTournamentList] = React.useState<Tournament[]>(
    null
  );

  React.useEffect(() => {
    let cleanupFunction = false;

    const tournamentRepo = new TournamentRepository();

    tournamentRepo.getAllTournamentsByUser().then((ts) => {
      !cleanupFunction && setTournamentList(ts);
    });

    return () => (cleanupFunction = true);
  }, []);

  if (tournamentList == null) return null;

  return (
    <div className={styles.container}>
      <div className={styles.tournamentList}>
        {tournamentList.map((tournament) => {
          return (
            <div key={tournament.id} className={styles.tournamentListItem}>
              <Link
                to={`/tournaments/${tournament.id}`}
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

export default MyTournaments;
