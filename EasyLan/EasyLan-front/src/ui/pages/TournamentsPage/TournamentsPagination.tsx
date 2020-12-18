import * as React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import cn from "classnames";

import styles from "./TournamentsPage.style.scss";

interface ITournamentsPaginationProps {
  currentPageNumber: number;
}

const TournamentsPagination: React.FunctionComponent<ITournamentsPaginationProps> = ({
  currentPageNumber,
}: ITournamentsPaginationProps) => {
  const { url } = useRouteMatch();
  const nextPageNumber = currentPageNumber + 1;
  const prevPageNumber = currentPageNumber - 1;

  const isPossibleToPrev = prevPageNumber >= 1;

  return (
    <div className={styles.paginator}>
      <div className={styles.paginatorWrapper}>
        {isPossibleToPrev ? (
          <>
            <Link to={url} className={styles.paginatorItem}>
              {"В начало"}
            </Link>
            <Link
              to={`${url}?page=${prevPageNumber}`}
              className={styles.paginatorItem}
            >
              {"<"}
            </Link>
          </>
        ) : null}

        <Link
          to={`${url}?page=${nextPageNumber}`}
          className={styles.paginatorItem}
        >
          {">"}
        </Link>
      </div>
    </div>
  );
};

export default TournamentsPagination;
