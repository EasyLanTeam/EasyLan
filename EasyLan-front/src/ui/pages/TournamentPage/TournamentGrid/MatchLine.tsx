import * as React from "react";
import styles from "./TournamentGrid.style.scss";

interface IMatchLineProps {
  startPosX: number;
  startPosY: number;
  endPosX: number;
  endPosY: number;
}

const LINE_WIDTH = 4;

const MatchLine: React.FunctionComponent<IMatchLineProps> = ({
  startPosX,
  startPosY,
  endPosX,
  endPosY,
}: IMatchLineProps) => {
  const width = endPosX - startPosX;
  const height = endPosY - startPosY;

  return (
    <svg
      style={{
        position: "absolute",
        left: `${startPosX}px`,
        top: `${(height > 0 ? startPosY : endPosY)}px`,
      }}
      width={Math.abs(width)}
      height={Math.abs(height) + LINE_WIDTH}
      className={styles.matchLine}
    >
      {height < 0 ? (
        <path
          d={`
        M 0 ${Math.abs(height)}
        L ${width / 2} ${Math.abs(height)}
        L ${width / 2} 0
        L ${width} 0`}
        ></path>
      ) : (
        <path
          d={`
        M 0 ${LINE_WIDTH / 2}
        L ${width / 2} ${LINE_WIDTH / 2}
        L ${width / 2} ${height}
        L ${width} ${height}`}
        ></path>
      )}
    </svg>
  );
};

export default MatchLine;
