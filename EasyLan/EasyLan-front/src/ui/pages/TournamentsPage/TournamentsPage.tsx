import * as React from "react";
import CreateTournamentPage from "../CreateTournamentPage";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import TournamentPage from "../TournamentPage";
import { PrivateRoute } from "../../components/PrivateRoute/PrivateRoute";
import { TournamentList } from "./TournamentList";

import styles from "./TournamentsPage.style.scss";

interface ITournamentsPageProps {}

const TournamentsPage: React.FunctionComponent<ITournamentsPageProps> = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}`} exact>
        <TournamentList />
      </Route>
      <PrivateRoute roles={["initiator"]} path={`${path}/create`}>
        <CreateTournamentPage></CreateTournamentPage>
      </PrivateRoute>
      <Route path={`${path}/:tournamentId`}>
        <TournamentPage></TournamentPage>
      </Route>
    </Switch>
  );
};

export default TournamentsPage;
