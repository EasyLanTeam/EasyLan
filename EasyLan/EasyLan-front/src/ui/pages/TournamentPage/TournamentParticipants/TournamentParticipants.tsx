import * as React from "react";
import Paper from "../../../components/Paper";
import Table from "../../../components/Table/Table";

import styles from "./TournamentParticipants.style.scss";

interface ITournamentParticipantsProps {}

const TournamentParticipants: React.FunctionComponent<ITournamentParticipantsProps> = () => {
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
          <Table.Row>
            <Table.Cell className={styles.row}>1</Table.Cell>
            <Table.Cell>username</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className={styles.row}>1</Table.Cell>
            <Table.Cell>username</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Paper>
  );
};

export default TournamentParticipants;
