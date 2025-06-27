import React, { useMemo, lazy, Suspense } from "react";
import _ from "lodash";
import { Routes, Route } from "react-router-dom";

import { WebPaths } from "src/routing/routes";

const SignIn = lazy(() => import("src/pages/public/SignIn/SignIn"));

type Props = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
};

const PublicRoute: React.FC<Props> = ({
  isAuthenticated,
  setIsAuthenticated,
}) => {
  const publicConfig = [
    {
      key: "sign-in",
      path: WebPaths.SignIn,
      Component: (
        <SignIn
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      ),
    },
  ];

  const routes = useMemo(
    () =>
      _.map(publicConfig, ({ key, path, Component }) => (
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

export default PublicRoute;
