import * as React from "react";
import Paper from "../../components/Paper";
import Button from "../../components/base/Button";
import { mdiClose, mdiPencil } from "@mdi/js";
import { useAuth } from "../../../domain/auth/appAuth";
import TournamentInfo from "./TournamentInfo";
import Dialog from "../../components/Dialog/Dialog";
import PleaseLoginToTakePartitionModal from "./PleaseLoginToTakePartitionModal/PleaseLoginToTakePartitionModal";
import TournamentRepository from "../../../data/services/TournamentRepository";
import { notifyError, notifySuccess } from "../../../domain/notify";
import { useHistory } from "react-router-dom";
import { useTournament } from "../../../domain/tournamentContext";
import { ApiFailureResult } from "../../../data/services/ApiResult";

import styles from "./TournamentPage.style.scss";

interface ITournamentMainProps {}

export const TournamentMain: React.FunctionComponent<ITournamentMainProps> = () => {
  const { user } = useAuth();
  const { tournament, flags } = useTournament();
  const history = useHistory();
  const [
    openCancelTournamentDialog,
    setOpenCancelTournamentDialog,
  ] = React.useState(false);
  const [
    openLoginToTakePatiotionModal,
    setOpenLoginToTakePatiotionModal,
  ] = React.useState(false);
  const userRole = user && user.role;

  const handleClickCancelTournamentButton = () => {
    setOpenCancelTournamentDialog(true);
  };

  const handleClickTakePartitonButton = () => {
    if (!user) {
      setOpenLoginToTakePatiotionModal(true);
    } else {
      const rep = new TournamentRepository();
      rep.takePartition(tournament.id).then((res) => {
        if (res.success) {
          notifySuccess("Вы успешно зарегистрированы на турнир");
        } else {
          const { error } = res as ApiFailureResult;
          notifyError(error.error);
        }
      });
    }
  };

  const handleCancelTournament = () => {
    setOpenCancelTournamentDialog(false);
    const rep = new TournamentRepository();

    rep.deleteTournament(tournament.id).then((res) => {
      if (res.success) {
        notifySuccess("Турнир успешно отменен");
        history.replace("/tournaments");
      } else {
        const { error } = res as ApiFailureResult;
        notifyError(error.error);
      }
    });
  };

  const handleExitCancelTournament = () => {
    setOpenCancelTournamentDialog(false);
  };

  const handleClickStartTournament = () => {
    console.log("start");
  };

  const handleClickUpdateTournament = () => {
    history.push(`/tournaments/${tournament.id}/update`);
  };

  const renderUserActions = () => {
    const { isTakeParticipation } = flags;

    return !isTakeParticipation ? (
      <Button
        variant={"primary"}
        className={styles.tournamentMainActionsButton}
        onClick={handleClickTakePartitonButton}
      >
        Принять участие
      </Button>
    ) : (
      <Button
        className={styles.tournamentMainActionsButton}
        onClick={() => {
          console.log("отказ");
        }}
      >
        Отказ от участия
      </Button>
    );
  };

  const renderInitiatorActions = () => {
    const {
      isPending,
      isPossibleToFinish,
      isEditable,
    } = flags;

    if (!isEditable) {
      return renderUserActions();
    }

    return (
      <>
        {isPending ? (
          <Button
            variant={"primary"}
            className={styles.tournamentMainActionsButton}
            onClick={handleClickStartTournament}
          >
            Начать турнир
          </Button>
        ) : isPossibleToFinish ? (
          <Button
            variant={"primary"}
            className={styles.tournamentMainActionsButton}
          >
            Завершить турнир
          </Button>
        ) : null}
        {isPending ? (
          <>
            <Button
              icon={{ path: mdiPencil }}
              className={styles.tournamentMainActionsButton}
              onClick={handleClickUpdateTournament}
            >
              Внести изменения
            </Button>
            <Button
              icon={{ path: mdiClose }}
              className={styles.tournamentMainActionsButton}
              onClick={handleClickCancelTournamentButton}
            >
              Отменить турнир
            </Button>
          </>
        ) : null}
      </>
    );
  };

  return (
    <Paper className={styles.paper}>
      <TournamentInfo tournament={tournament} />
      <div className={styles.tournamentMainActions}>
        {!userRole || userRole === "user"
          ? renderUserActions()
          : renderInitiatorActions()}
      </div>
      <Dialog
        open={openCancelTournamentDialog}
        onOk={handleCancelTournament}
        onCancel={handleExitCancelTournament}
        message="Вы действительно хотите отменить турнир? Все данные турнира будут утеряны."
        title="Отмена турнира"
      ></Dialog>
      <PleaseLoginToTakePartitionModal
        open={openLoginToTakePatiotionModal}
        onExit={() => setOpenLoginToTakePatiotionModal(false)}
      />
    </Paper>
  );
};
