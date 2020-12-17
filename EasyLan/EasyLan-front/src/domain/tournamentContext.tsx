import React, { useState, useEffect, useContext, createContext } from "react";
import { useParams } from "react-router-dom";
import { Tournament } from "../data/entities/Tournament";
import { TournamentMatch } from "../data/entities/TournamentMatch";
import { TournamentParticipant } from "../data/entities/TournamentParticipant";
import { UserData } from "../data/entities/UserData";
import { ApiFailureResult } from "../data/services/ApiResult";
import TournamentRepository from "../data/services/TournamentRepository";
import ErrorPage from "../ui/pages/ErrorPage/ErrorPage";
import { useAuth } from "./auth/appAuth";
import { notifyError } from "./notify";

function getMatches(tournamentId: string) {
  return fetch(`/api/Match/GetMatches/${tournamentId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    mode: "cors",
  }).then((res) => {
    if (res.status !== 200) {
      console.error(res.status);
    }

    return res.json();
  }) as Promise<TournamentMatch[][]>;
}

function getParticipatns(tournamentId: string) {
  return fetch(`/api/Tournament/GetParticipants/${tournamentId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    mode: "cors",
  }).then((res) => {
    if (res.status !== 200) {
      console.error(res.status);
    }

    return res.json();
  }) as Promise<TournamentParticipant[]>;
}

interface ITournamentFlags {
  isPending: boolean;
  isOngoing: boolean;
  isFinished: boolean;
  isEditable: boolean;
  isTakeParticipation: boolean;
  isPossibleToFinish: boolean;
}

interface ITournamentContext {
  flags: ITournamentFlags;
  tournament: Tournament;
  updateTournamentFromServer: () => any;
  participants: TournamentParticipant[];
  updateParticipantsFromServer: () => any;
  matches: TournamentMatch[][];
  updateMatchesFromServer: () => any;
  updateAllFromServer: () => any;
}

const TournamentContext = createContext<ITournamentContext>({
  tournament: null,
  flags: null,
  participants: null,
  matches: null,
  updateTournamentFromServer: null,
  updateParticipantsFromServer: null,
  updateMatchesFromServer: null,
  updateAllFromServer: null,
});

const getTournamentFlags: (
  t: Tournament,
  p: TournamentParticipant[],
  m: TournamentMatch[][],
  userData: UserData
) => ITournamentFlags = (
  tournament: Tournament,
  participants: TournamentParticipant[],
  matches: TournamentMatch[][],
  userData: UserData
) => {
  if (!tournament) return null;

  const { state } = tournament;

  const isTakeParticipation =
    participants &&
    userData &&
    participants.find((p) => p.userId == userData.id) != null;

  const isPossibleToFinish =
    matches &&
    matches[matches.length - 1] &&
    matches[matches.length - 1].find((m) => m.winnerId != null) != null;

  const isEditable = userData != null && userData.id === tournament.initiatorId;

  return {
    isPending: state === 0,
    isOngoing: state === 1,
    isFinished: state === 2,
    isTakeParticipation,
    isPossibleToFinish,
    isEditable,
  };
};

function useProvideTournament() {
  const { tournamentId } = useParams<{ tournamentId: string }>();
  const { user } = useAuth();
  const [tournament, setTournament] = useState<Tournament | false>(null);
  const [participants, setParticipants] = useState<TournamentParticipant[]>(
    null
  );
  const [matches, setMathces] = useState<TournamentMatch[][]>(null);

  const updateTournamentFromServer = (cleanupFunction: boolean) => {
    const tournamentsRepository = new TournamentRepository();
    tournamentsRepository.getTournamentById(tournamentId).then((res) => {
      if (!res.success) {
        const { error } = res as ApiFailureResult;
        if (error.error === "NOT_FOUND") {
          !cleanupFunction && setTournament(false);
        } else {
          notifyError(error.error);
        }
        return;
      }

      !cleanupFunction && setTournament(res.result);
    });
  };

  const updateParticipantsFromServer = (cleanupFunction: boolean) => {
    getParticipatns(tournamentId).then((participants) => {
      setParticipants(participants);
    });
  };

  const updateMatchesFromServer = (cleanupFunction: boolean) => {
    getMatches(tournamentId).then((matches) => {
      setMathces(matches);
    });
  };

  useEffect(() => {
    let cleanupFunction = false;
    console.log("call tournament context");

    updateTournamentFromServer(cleanupFunction);
    updateParticipantsFromServer(cleanupFunction);
    updateMatchesFromServer(cleanupFunction);

    return () => (cleanupFunction = true);
  }, []);

  const flags = getTournamentFlags(
    tournament == false ? null : tournament,
    participants,
    matches,
    user == false ? null : user
  );

  return {
    tournament,
    participants,
    matches,
    flags,
    updateTournamentFromServer: () => {
      updateTournamentFromServer(false);
    },
    updateParticipantsFromServer: () => {
      updateParticipantsFromServer(false);
    },
    updateMatchesFromServer: () => {
      updateMatchesFromServer(false);
    },
    updateAllFromServer: () => {
      updateTournamentFromServer(false);
      updateParticipantsFromServer(false);
      updateMatchesFromServer(false);
    },
  };
}

type ProvideTournamentProps = {
  children: React.ReactNode;
};

export const ProvideTournament: React.FunctionComponent<ProvideTournamentProps> = ({
  children,
}: ProvideTournamentProps) => {
  const value = useProvideTournament();
  const { tournament, ...rest } = value;

  if (tournament == null) {
    return null;
  } else if (tournament == false) {
    return <ErrorPage code={404} />;
  }

  const checkedValue = {
    tournament,
    ...rest,
  };

  return (
    <TournamentContext.Provider value={checkedValue}>
      {children}
    </TournamentContext.Provider>
  );
};

export const useTournament = (): ITournamentContext => {
  return useContext(TournamentContext);
};
