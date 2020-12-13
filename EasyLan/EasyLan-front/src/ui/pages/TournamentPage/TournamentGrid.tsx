import * as React from "react";
import cn from "classnames";
import styles from "./TournamentGrid.style.scss";

interface ITournamentGridProps {}

// const COUNT = 8;

const MatchCard = () => {
  return (
    <div className={styles.match}>
      <div
        className={cn(styles.matchParticipant, styles.matchParticipantWinner)}
      >
        Part 1
      </div>
      <div className={styles.matchParticipant}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid dignissimos praesentium inventore asperiores, nulla architecto, expedita ratione sequi reiciendis sunt consequuntur a dolorem. Cum culpa reprehenderit natus cumque quibusdam alias!</div>
      <span className={styles.matchSeparator}>Vs</span>
    </div>
  );
};

const TournamentGrid: React.FunctionComponent<ITournamentGridProps> = () => {
  return <MatchCard />;
};

export default TournamentGrid;
