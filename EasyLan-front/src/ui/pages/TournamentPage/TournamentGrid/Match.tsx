import * as React from "react";
import cn from "classnames";
import { TournamentMatch } from "../../../../data/entities/TournamentMatch";

import styles from "./TournamentGrid.style.scss";

interface IMatchBracketProps {
  match: TournamentMatch;
  onSetWinner: (matchId: string, winnerId: string) => void;
  xPos: number,
  yPos: number,
}

export const Match: React.FunctionComponent<IMatchBracketProps> = ({
  match,
  onSetWinner,
  xPos,
  yPos
}: IMatchBracketProps) => {
  const handleClickParticipant = (participantId: string) => {
    console.log(match.winnerId, participantId);
    if (match.winnerId === participantId) {
      participantId = null;
    }

    onSetWinner(match.matchId, participantId);
  };

  const firstPlayerWin =
    match.firstPlayerId != null && match.firstPlayerId === match.winnerId;
  const secondPlayerWin =
    match.secondPlayerId != null && match.secondPlayerId === match.winnerId;

  return (
    <div className={styles.match} style={{top: yPos, left: xPos}}>
      <div
        className={cn(
          styles.matchParticipant,
          firstPlayerWin && styles.matchParticipantWinner
        )}
        onClick={() => handleClickParticipant(match.firstPlayerId)}
      >
        {match.firstPlayerName || "n/a"}
      </div>
      <div
        className={cn(
          styles.matchParticipant,
          secondPlayerWin && styles.matchParticipantWinner
        )}
        onClick={() => handleClickParticipant(match.secondPlayerId)}
      >
        {match.secondPlayerName || "n/a"}
      </div>
      <span className={styles.matchSeparator}>Vs</span>
    </div>
  );
};
