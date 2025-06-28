import React, { useMemo, lazy, Suspense } from "react";
import _ from "lodash";
import { Routes, Route } from "react-router-dom";

import { WebPaths } from "src/routing/routes";

const Home = lazy(() => import("src/pages/private/Home/Home"));
const Petition = lazy(
  () => import("src/pages/private/PetitionModule/pages/Petition/Petition")
);

type Props = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
};

const PrivateRoute: React.FC<Props> = ({
  isAuthenticated,
  setIsAuthenticated,
}) => {
  const privateConfig = [
    {
      key: "home",
      path: WebPaths.Home,
      Component: <Home />,
    },
    {
      key: "petition",
      path: WebPaths.Petition,
      Component: <Petition />,
    },
  ];

  const routes = useMemo(
    () =>
      _.map(privateConfig, ({ key, path, Component }) => (
        <Route key={key} path={path} element={Component} />
      )),
    [isAuthenticated, setIsAuthenticated]
  );

  return (
    <Suspense>
      <Routes>
        {routes}
        <Route path="*" />
      </Routes>
    </Suspense>
  );
};

export default PrivateRoute;
