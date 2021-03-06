import * as React from "react";
import { useTournament } from "../../../../domain/tournamentContext";
import Paper from "../../../components/Paper";
import Table from "../../../components/Table/Table";

import styles from "./TournamentParticipants.style.scss";

interface ITournamentParticipantsProps {}

const TournamentParticipants: React.FunctionComponent<ITournamentParticipantsProps> = () => {
  const {
    participants,
    flags: { isFinished },
  } = useTournament();

  const renderTableWithResults = () => {
    return (
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell className={styles.row}>№</Table.HeadCell>
            <Table.HeadCell>Имя участника</Table.HeadCell>
            <Table.HeadCell>Изменения рейтинга</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {participants &&
            participants.map((p, i) => {
              const index = i + 1;
              return (
                <Table.Row key={p.userId}>
                  <Table.Cell className={styles.row}>{index}</Table.Cell>
                  <Table.Cell>{p.username}</Table.Cell>
                  <Table.Cell>{`${p.scoreInMoment} (+${p.scoreDelta})`}</Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    );
  };

  return (
    <Paper className={styles.paper}>
      {isFinished ? (
        renderTableWithResults()
      ) : (
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell className={styles.row}>№</Table.HeadCell>
              <Table.HeadCell>Имя участника</Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {participants &&
              participants.map((p, i) => {
                const index = i + 1;
                return (
                  <Table.Row key={p.userId}>
                    <Table.Cell className={styles.row}>{index}</Table.Cell>
                    <Table.Cell>{p.username}</Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      )}
    </Paper>
  );
};

export default TournamentParticipants;
