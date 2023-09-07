import { PathFindingVisualizer } from "@/pathfinding"
import {
  Fallback,
  Outlet,
  RouterProvider,
  createRouter,
  getPath,
} from "@/routes"
import { SortingVisualizer } from "@/sorting"
import { AppShell } from "@/styles"
import { Header } from "./header"

export const App: React.FC = () => {
  return <RouterProvider router={router} />
}

const Layout: React.FC = () => {
  return (
    <AppShell header={<Header />}>
      <Outlet />
    </AppShell>
  )
}

const FallbackToSorting: React.FC = () => {
  return <Fallback to={getPath("sorting")} />
}

const router = createRouter(
  [
    {
      path: getPath("index"),
      Component: Layout,
      children: [
        {
          index: true,
          Component: FallbackToSorting,
        },
        {
          path: getPath("sorting"),
          Component: SortingVisualizer,
        },
        {
          path: getPath("pathfinding"),
          Component: PathFindingVisualizer,
        },
        {
          path: getPath("unknown"),
          Component: FallbackToSorting,
        },
      ],
    },
    {
      path: getPath("unknown"),
      Component: FallbackToSorting,
    },
  ],
  {
    basename: "/visualizers",
  }
)
