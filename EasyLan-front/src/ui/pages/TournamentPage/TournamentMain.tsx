import * as React from "react";
import Paper from "../../components/Paper";
import Button from "../../components/base/Button";
import { mdiClose, mdiPencil } from "@mdi/js";
import { ITournamentMainProps } from "./TournamentPage";
import { useAuth } from "../../../domain/auth/appAuth";

import styles from "./TournamentPage.style.scss";

export const TournamentMain: React.FunctionComponent<ITournamentMainProps> = ({
  tournament,
}: ITournamentMainProps) => {
  const { user } = useAuth();
  const userRole = user && user.role;

  return (
    <div className={styles.mainContainer}>
      <Paper className={styles.paper}>
        <div className={styles.info}>
          <div className={styles.infoHeader}>
            <div className={styles.infoUsername}>{`${tournament.game}`}</div>
            <div
              className={styles.infoRating}
            >{`${tournament.gameFormat}`}</div>
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
            {tournament.addditionalInfo && (
              <div>
                <div>{"Дополнительная информация:"}</div>
                <div>{tournament.addditionalInfo}</div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.tournamentMainActions}>
          {!userRole || userRole === "user" ? (
            <Button
              variant={"primary"}
              className={styles.tournamentMainActionsButton}
            >
              Принять участие
            </Button>
          ) : (
            <>
              <Button
                variant={"primary"}
                className={styles.tournamentMainActionsButton}
              >
                Начать турнир
              </Button>
              <Button
                icon={{ path: mdiPencil }}
                className={styles.tournamentMainActionsButton}
              >
                Внести изменения
              </Button>
              <Button
                icon={{ path: mdiClose }}
                className={styles.tournamentMainActionsButton}
              >
                Отменить турнир
              </Button>
            </>
          )}
        </div>
      </Paper>
    </div>
  );
};
