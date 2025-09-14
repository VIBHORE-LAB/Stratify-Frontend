import { Suspense, ReactNode } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { routesMap } from "./routesMap";
import PreLayout from "../Layout/PreLayout";
import PostLayout from "../Layout/PostLayout";

// ✅ Auth hook
const useAuth = () => {
  return !!localStorage.getItem("token");
};

// ✅ Private route wrapper
function PrivateRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

export function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
        <Routes>
          {routesMap.map(({ path, element: Element, type, layout = "pre" }) => {
            let WrappedElement = <Element />;

            // ✅ Apply layout
            if (layout === "pre") {
              WrappedElement = <PreLayout>{WrappedElement}</PreLayout>;
            } else if (layout === "post") {
              WrappedElement = <PostLayout>{WrappedElement}</PostLayout>;
            }

            if (type === "private") {
              return (
                <Route
                  key={path}
                  path={path}
                  element={<PrivateRoute>{WrappedElement}</PrivateRoute>}
                />
              );
            }

            return <Route key={path} path={path} element={WrappedElement} />;
          })}

          {/* ✅ 404 fallback */}
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
