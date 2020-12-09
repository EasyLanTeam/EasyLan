import * as React from "react";
import { TournamentMatch } from "../../../../data/entities/TournamentMatch";
import { Tournament } from "../../../../data/entities/Tournament";
import { MatchBracket } from "./MatchBracket";

import styles from "./TournamentGrid.style.scss";

interface ITournamentGridProps {
  tournament: Tournament;
}

function getMatches(tournamentId: string) {
  return fetch(`/api/Match/GetMatches/${tournamentId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    mode: "cors",
  }).then((res) => {
    if (res.status !== 200) {
      console.error(res.status);
    }

    return res.json();
  }) as Promise<TournamentMatch[][]>;
}

const TournamentGrid: React.FunctionComponent<ITournamentGridProps> = ({
  tournament,
}: ITournamentGridProps) => {
  const [matches, setMatches] = React.useState<TournamentMatch[][]>(null);
  React.useEffect(() => {
    getMatches(tournament.id).then((m) => setMatches(m));
  }, []);

  if (!matches) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {matches.map((matchesList, i) => {
          return (
            <div key={`level-${i}`} className={styles.column}>
              {matchesList.map((match) => {
                return <MatchBracket match={match} key={match.matchId} />;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TournamentGrid;
