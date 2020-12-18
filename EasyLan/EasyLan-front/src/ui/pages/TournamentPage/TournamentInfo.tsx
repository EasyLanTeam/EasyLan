import * as React from "react";
import { useTournament } from "../../../domain/tournamentContext";
import styles from "./TournamentPage.style.scss";

interface ITournamentInfoProps {}

const TournamentInfo: React.FunctionComponent<ITournamentInfoProps> = (
  props: ITournamentInfoProps
) => {
  const {
    tournament,
    flags: { isOngoing, isFinished, isPending },
  } = useTournament();

  return (
    <div className={styles.info}>
      <div className={styles.infoHeader}>
        {isPending ? null : (
          <div className={styles.infoUsername}>
            {isOngoing ? "Турнир идет" : isFinished ? "Турнир завершен" : null}
          </div>
        )}
        <div className={styles.infoUsername}>{`${tournament.game}`}</div>
        <div className={styles.infoRating}>{`${tournament.gameFormat}`}</div>
      </div>
      <div className={styles.infoBody}>
        <div>{`Организатор: ${tournament.initiatorFullname}`}</div>
        <div>
          <div>{"Адрес проведения:"}</div>
          <div>{tournament.location}</div>
        </div>
        <div>
          <div>{"Время проведения:"}</div>
          <span>{new Date(tournament.datetime).toLocaleDateString()}</span>
          <span>{"  "}</span>
          <span>
            {
              new Date(tournament.datetime)
                .toLocaleTimeString()
                .match(/\d{2}:\d{2}/)[0]
            }
          </span>
        </div>
        {tournament.prizes ? (
          <div>
            {tournament.prizes
              .sort((p) => p.place)
              .map((p) => (
                <div key={`prize-${p.place}`}>
                  <div>{`Приз за ${p.place}-е место: `}</div>
                  <div>{p.prize}</div>
                </div>
              ))}
          </div>
        ) : (
          <div>Без призов</div>
        )}
        {tournament.fee !== 0 && (
          <div>
            <div>{"Взнос за участие:"}</div>
            <div>{`${tournament.fee} рублей`}</div>
          </div>
        )}
        {tournament.additionalInfo && (
          <div>
            <div>{"Дополнительная информация:"}</div>
            <div>{tournament.additionalInfo}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentInfo;
