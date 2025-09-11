import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { routesMap } from "./routesMap";
import PreLayout from "../Layout/PreLayout";
import PostLayout from "../Layout/PostLayout";

const useAuth = () => {
  return !!localStorage.getItem("token");
};

export function AppRoutes() {
  const isAuthenticated = useAuth();

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routesMap.map(({ path, element: Element, type }) => {
            if (type === "private") {
              if (!isAuthenticated) {
                return <Route key={path} path={path} element={<Navigate to="/login" />} />;
              }
              return (
                <Route
                  key={path}
                  path={path}
                  element={
                    <PostLayout>
                      <Element />
                    </PostLayout>
                  }
                />
              );
            }

            return (
              <Route
                key={path}
                path={path}
                element={
                  <PreLayout>
                    <Element />
                  </PreLayout>
                }
              />
            );
          })}
        </Routes>
      </Suspense>
    </Router>
  );
}
