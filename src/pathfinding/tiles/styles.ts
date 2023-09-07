import { createStyles, type Theme } from "@/styles"
import { type Indicator } from "../algorithms"

export const useTileStyles = createStyles(
  (theme, { indicator, grabbing }: Params) => ({
    tile: {
      width: theme.spacing.xl,
      height: theme.spacing.xl,
      background: getTileBackground(theme, indicator),
      cursor: grabbing ? "grabbing" : "pointer",
    },
  })
)

const getTileBackground = (theme: Theme, indicator: Indicator) => {
  switch (indicator) {
    case "normal":
      return theme.fn.dimmed()
    case "obstacle":
      return theme.colors.gray[9]
    case "initial":
      return theme.colors.yellow[4]
    case "terminal":
      return theme.colors.green[4]
    case "current":
      return theme.colors.blue[5]
    case "visited":
      return theme.colors.blue[9]
    case "shortest":
      return theme.colors.red[3]
  }
}

type Params = {
  indicator: Indicator
  grabbing: boolean
}
