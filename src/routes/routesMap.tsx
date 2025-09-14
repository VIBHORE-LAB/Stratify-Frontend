import { lazy, LazyExoticComponent, ComponentType } from "react";

export type RouteType = "public" | "private" | "independent";
export type LayoutType = "pre" | "post" | "none";

export interface AppRoute {
  path: string;
    layout?: LayoutType; 

  element: LazyExoticComponent<ComponentType<unknown>>;
  type: RouteType;
}

export const routesMap: AppRoute[] = [
  {
    path: "/",
    element: lazy(() => import("../pages/LandingPage")),
    type: "public",
    layout: "pre",
  },
  {
    path: "/login",
    element: lazy(() => import("../pages/LoginPage")),
    type: "independent",
    layout: "none",
  },
  {
    path: "/register",
    element: lazy(() => import("../pages/RegisterPage")),
    type: "independent",
    layout: "none",
  },
  {
    path: "/dashboard",
    element: lazy(() => import("../pages/Dashboard")),
    type: "private",
    layout: "post",
  },
  {
    path: "/backtest",
    element: lazy(() => import("../pages/NewBackTest")),
    type: "private",
    layout: "post",
  },
  {
    path: "/results",
    element: lazy(() => import("../pages/Results")),
    type: "private",
    layout: "post",
  },
];
