import * as React from "react";
import cn from "classnames";
import { TournamentMatch } from "../../../../data/entities/TournamentMatch";

import styles from "./TournamentGrid.style.scss";

interface IMatchBracketProps {
  match: TournamentMatch;
  onSetWinner: (matchId: string, winnerId: string) => void;
  xPos: number;
  yPos: number;
}

export const Match: React.FunctionComponent<IMatchBracketProps> = ({
  match,
  onSetWinner,
  xPos,
  yPos,
  ...rest
}: IMatchBracketProps) => {
  const handleClickParticipant = (participantId: string) => {
    if (participantId == null) return;

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
    <div className={styles.match} style={{ top: yPos, left: xPos }} {...rest}>
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
