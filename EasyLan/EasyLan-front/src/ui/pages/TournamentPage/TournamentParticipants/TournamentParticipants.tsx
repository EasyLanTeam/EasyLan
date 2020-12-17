import * as React from "react";
import { useTournament } from "../../../../domain/tournamentContext";
import Paper from "../../../components/Paper";
import Table from "../../../components/Table/Table";

import styles from "./TournamentParticipants.style.scss";

interface ITournamentParticipantsProps {}

const TournamentParticipants: React.FunctionComponent<ITournamentParticipantsProps> = () => {
  const { participants } = useTournament();

  console.log(participants);

  return (
    <Paper className={styles.paper}>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell className={styles.row}>№</Table.HeadCell>
            <Table.HeadCell>Имя участника</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {participants && participants.map((p, i) => {
            const index = i + 1;
            return (
              <Table.Row key={p.userId}>
                <Table.Cell className={styles.row}>{index}</Table.Cell>
                <Table.Cell>{p.userId}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Paper>
  );
};

export default TournamentParticipants;
