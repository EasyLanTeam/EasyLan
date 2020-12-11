import * as React from "react";
import { TournamentMatch } from "../../../../data/entities/TournamentMatch";
import { Tournament } from "../../../../data/entities/Tournament";
import { Match } from "./Match";
import MatchLine from "./MatchLine";

import styles from "./TournamentGrid.style.scss";
import { notifyError, notifySuccess } from "../../../../domain/notify";

interface ITournamentGridProps {
  tournament: Tournament;
}

type MatchLayoutData = { xPos: number; yPos: number };
type GridLayoutData = {
  width: number;
  height: number;
  mapMatchIdToLayoutData: { [key: string]: MatchLayoutData };
};

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

function fillMatchesDict(matches: TournamentMatch[][]) {
  const matchesDict: { [key: string]: TournamentMatch } = {};

  matches.forEach((list) => {
    list.forEach((m) => {
      matchesDict[m.matchId] = m;
    });
  });

  return matchesDict;
}

function setWinner(matchId: string, winnerId: string) {
  return fetch(
    `/api/Match/SetWinner?matchId=${matchId}${
      winnerId ? `&userId=${winnerId}` : ""
    }`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      mode: "cors",
    }
  ) as Promise<Response>;
}

const MATCH_WIDTH = 170;
const MATCH_HEIGHT = 96;
const MATCH_MARGIN_X = 64;
const MATCH_MARGIN_Y = 50;

const getGridLayoutData: (matches: TournamentMatch[][]) => GridLayoutData = (
  matches: TournamentMatch[][]
) => {
  const levelsCount = matches.length;
  const maxMatchesInLevel = Math.round(Math.pow(2, levelsCount - 1));
  const containerWidth =
    levelsCount * MATCH_WIDTH + (levelsCount - 1) * MATCH_MARGIN_X;
  const containerHeight =
    maxMatchesInLevel * MATCH_HEIGHT + (maxMatchesInLevel - 1) * MATCH_MARGIN_Y;

  const result: GridLayoutData = {
    width: containerWidth,
    height: containerHeight,
    mapMatchIdToLayoutData: {},
  };
  matches.map((matchesList) => {
    matchesList
      .sort((m1, m2) => m1.navNumber - m2.navNumber)
      .map((match, i) => {
        const level = match.level - 1;
        const step = levelsCount - match.level;
        const matchesOnStepCount = Math.round(Math.pow(2, step));
        const navNumberByLevel = i;
        const xPos = level * MATCH_WIDTH + level * MATCH_MARGIN_X;
        const levelMarginTop =
          (containerHeight -
            matchesOnStepCount * MATCH_HEIGHT -
            (matchesOnStepCount - 1) * MATCH_MARGIN_Y) /
          2;
        const yPos =
          levelMarginTop +
          navNumberByLevel * MATCH_HEIGHT +
          navNumberByLevel * MATCH_MARGIN_Y;

        result.mapMatchIdToLayoutData[match.matchId] = {
          xPos,
          yPos,
        };
      });
  });

  return result;
};

const TournamentGrid: React.FunctionComponent<ITournamentGridProps> = ({
  tournament,
}: ITournamentGridProps) => {
  const [matches, setMatches] = React.useState<TournamentMatch[][]>(null);
  React.useEffect(() => {
    let cleanupFunction = false;
    getMatches(tournament.id).then((m) => setMatches(m));

    return () => (cleanupFunction = true);
  }, []);

  if (!matches) {
    return null;
  }

  const matchesDict = fillMatchesDict(matches);

  const onSetWinner = (matchId: string, winnerId: string) => {
    let nextMatch = matchesDict[matchesDict[matchId].nextMatchId];
    while (nextMatch) {
      if (nextMatch.winnerId != null) {
        notifyError(
          "Перед определением победителя матча необходимо снять победителей с последующих матчей"
        );
        return;
      }

      nextMatch = matchesDict[nextMatch.nextMatchId];
    }

    setWinner(matchId, winnerId).then((res) => {
      if (res.status === 200) {
        notifySuccess("Изменение успешно");
        getMatches(tournament.id).then((m) => setMatches(m));
      }
    });
  };

  const gridLayoutData = getGridLayoutData(matches);

  return (
    <div className={styles.container}>
      <div
        className={styles.grid}
        style={{ width: gridLayoutData.width, height: gridLayoutData.height }}
      >
        {matches.map((matchesList) => {
          return matchesList
            .sort((m1, m2) => m1.navNumber - m2.navNumber)
            .map((match) => {
              const { xPos, yPos } = gridLayoutData.mapMatchIdToLayoutData[
                match.matchId
              ];
              const nextMatchLayoutData =
                match.nextMatchId &&
                gridLayoutData.mapMatchIdToLayoutData[match.nextMatchId];

              return (
                <>
                  {nextMatchLayoutData ? (
                    <MatchLine
                      startPosX={xPos + MATCH_WIDTH}
                      startPosY={yPos + MATCH_HEIGHT / 2}
                      endPosX={nextMatchLayoutData.xPos}
                      endPosY={nextMatchLayoutData.yPos + MATCH_HEIGHT / 2}
                    />
                  ) : null}
                  <Match
                    key={match.matchId}
                    match={match}
                    xPos={xPos}
                    yPos={yPos}
                    onSetWinner={onSetWinner}
                  />
                </>
              );
            });
        })}
      </div>
    </div>
  );
};

export default TournamentGrid;
