/// <reference types="vite/client" />

declare global {
  type Nullish<T> = T | null
}

import "react"
declare module "react" {
  interface CSSProperties {
    "--value"?: number
  }
}
