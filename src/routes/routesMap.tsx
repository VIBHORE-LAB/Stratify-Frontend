import { lazy, LazyExoticComponent, ComponentType } from "react";

export type RouteType = "public" | "private" | "independent";

export interface AppRoute {
  path: string;
  element: LazyExoticComponent<ComponentType<unknown>>;
  type: RouteType;
}

export const routesMap: AppRoute[] = [
  {
    path: "/",
    element: lazy(() => import("../pages/LandingPage")),
    type: "public",
  },
  {
    path: "/login",
    element: lazy(() => import("../pages/LoginPage")),
    type: "independent",
  },
  {
    path: "/register",
    element: lazy(() => import("../pages/RegisterPage")),
    type: "independent",
  },
    {
    path: "/dashboard",
    element: lazy(() => import("../pages/Dashboard")),
    type: "private",
  },

  {
    path: "/backtest",
    element: lazy(() => import("../pages/NewBackTest")),
    type: "private"
  },

  {
    path:"/results",
    element: lazy(() => import("../pages/Results")),
    type: "private"
  }
];
