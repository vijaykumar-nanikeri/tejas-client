import React, { lazy, Suspense, useState, useEffect } from "react";

// Packages
import { Route, Routes, Navigate } from "react-router-dom";

// Components
const PrivateRouteWrapper = lazy(
  () => import("src/routing/PrivateRoute/PrivateRouteWrapper")
);
const PublicRouteWrapper = lazy(
  () => import("src/routing/PublicRoute/PublicRouteWrapper")
);
import { WebPaths } from "./routing/routes";

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("token")
  );

  // Debug authentication state changes
  useEffect(() => {
    // Authentication state changed
  }, [isAuthenticated]);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    const handleCustomEvent = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    // Listen to storage changes (from other tabs/windows)
    window.addEventListener("storage", handleStorageChange);

    // Listen to custom event for same-tab token changes
    window.addEventListener("tokenChanged", handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("tokenChanged", handleCustomEvent);
    };
  }, []);

  return (
    <Suspense>
      <Routes>
        {isAuthenticated ? (
          // User is authenticated - show private routes
          <Route
            path="*"
            element={
              <PrivateRouteWrapper
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />
        ) : (
          // User is not authenticated - show public routes
          <>
            <Route
              path={`${WebPaths.AuthPath}/*`}
              element={
                <PublicRouteWrapper
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            />
            <Route
              path="*"
              element={
                <Navigate
                  to={`${WebPaths.AuthPath}${WebPaths.SignIn}`}
                  replace
                />
              }
            />
          </>
        )}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
