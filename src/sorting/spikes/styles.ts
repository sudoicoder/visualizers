import { createStyles, type CSSObject } from "@/styles"
import { type Indicator } from "../algorithms"

export const useSpikeStyles = createStyles((theme, { indicator }: Params) => ({
  spike: {
    width: theme.spacing.xs,
    backgroundColor:
      theme.colors[theme.primaryColor][getSpikeColorIntensity(indicator)],
    borderRadius: theme.radius.md,
    outlineWidth: 1,
    outlineColor:
      theme.colors[theme.primaryColor][getSpikeColorIntensity(indicator)],
    outlineStyle: getSpikeOutlineStyle(indicator),
    outlineOffset: 2,
  },
}))

const getSpikeColorIntensity = (indicator: Indicator) => {
  switch (indicator) {
    case "normal":
      return 0
    case "current":
      return 3
    case "pivot":
      return 6
    case "sorted":
      return 9
  }
}

const getSpikeOutlineStyle = (
  indicator: Indicator
): CSSObject["outlineStyle"] => {
  return indicator === "pivot" ? "dashed" : "hidden"
}

type Params = {
  indicator: Indicator
}
