import * as React from "react";
import cn from "classnames";
import { TournamentMatch } from "../../../../data/entities/TournamentMatch";

import styles from "./TournamentGrid.style.scss";

interface IMatchBracketProps {
  match: TournamentMatch;
}

export const MatchBracket: React.FunctionComponent<IMatchBracketProps> = ({
  match,
}: IMatchBracketProps) => {
  return (
    <div className={styles.match}>
      <div
        className={cn(styles.matchParticipant, styles.matchParticipantWinner)}
      >
        {match.firstPlayerName || "n/a"}
      </div>
      <div className={styles.matchParticipant}>
        {match.secondPlayerName || "n/a"}
      </div>
      <span className={styles.matchSeparator}>Vs</span>
    </div>
  );
};
