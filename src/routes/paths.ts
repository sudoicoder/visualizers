export const getKnownRouteNames = () => {
  return knownRouteNames
}

export const getPath = (routeName: KnownRouteName | "unknown" | "index") => {
  return routeName === "unknown"
    ? "/*"
    : routeName === "index"
    ? "/"
    : routes[routeName]
}

const routes = {
  sorting: "sorting",
  pathfinding: "pathfinding",
} as const

const knownRouteNames = Object.keys(routes) as KnownRouteName[]

export type KnownRouteName = keyof typeof routes
