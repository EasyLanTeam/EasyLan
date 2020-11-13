import * as React from "react";
import Icon from "@mdi/react";
import { mdiClockTimeThree, mdiCalendar, mdiHumanMale } from "@mdi/js";
import TournamentRepository from "../../../data/TournamentRepository";
import cn from "classnames";
import styles from "./TournamentsPage.style.scss";

interface ITournamentsPageProps {}

const tournamentRepo = new TournamentRepository();

const TournamentsPage: React.FunctionComponent<ITournamentsPageProps> = (
  props
) => {
  // const [isTournamentsLoading, setIsTournamentsLoading] = React.useState({
  //   isTournamentsLoading: false,
  // });

  const tournamentList = tournamentRepo.getAllTournaments();

  return (
    <div className={styles.container}>
      <div className={styles.tournamentList}>
        {tournamentList.map((tournament) => {
          const mainPrize = tournament.prizes && tournament.prizes[0];

          return (
            <div key={tournament.id} className={styles.tournamentListItem}>
              <div className={styles.tournamentCard}>
                <div className={styles.tournamentCardWrapper}>
                  <div className={styles.tournamentCardTitle}>
                    {tournament.game +
                      (tournament.gameFormat
                        ? " – " + tournament.gameFormat
                        : "")}
                  </div>
                  <div>
                    {mainPrize ? `Главный приз: ${mainPrize}` : "Без призов"}
                  </div>
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
                        {
                          tournament.datetime
                            .toLocaleTimeString()
                            .match(/\d{2}:\d{2}/)[0]
                        }
                      </span>
                    </div>
                  </div>
                  <div
                    className={cn(
                      styles.tournamentCardParticipants,
                      styles.participants
                    )}
                  >
                    <Icon
                      path={mdiHumanMale}
                      size="16px"
                      className={styles.participantsIcon}
                    ></Icon>
                    <span className={styles.participantsText}>
                      {`${0}/${tournament.maxParticipants}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TournamentsPage;
