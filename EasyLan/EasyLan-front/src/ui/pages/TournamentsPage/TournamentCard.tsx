import * as React from "react";
import Icon from "@mdi/react";
import cn from "classnames";
import { Tournament } from "../../../data/entities/Tournament";
import { mdiClockTimeThree, mdiCalendar, mdiHumanMale } from "@mdi/js";

import styles from "./TournamentsPage.style.scss";

interface ITournamentCardProps {
  tournament: Tournament;
}

export const TournamentCard: React.FunctionComponent<ITournamentCardProps> = ({
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
        <div>{mainPrize ? `Главный приз: ${mainPrize}` : "Без призов"}</div>{" "}
        {tournament.initiatorFullname ? (
          <div
            className={styles.tournamentCardInitiator}
          >{`Организатор: ${tournament.initiatorFullname}`}</div>
        ) : null}
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
            {`${tournament.currentNumberOfParticipants}/${tournament.maxParticipants}`}
          </span>
        </div>
      </div>
    </div>
  );
};
