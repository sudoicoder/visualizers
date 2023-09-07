import { StrictMode } from "react"
import { App } from "./app"
import { StylesProvider } from "./styles"

export const Root: React.FC = () => {
  return (
    <StrictMode>
      <StylesProvider>
        <App />
      </StylesProvider>
    </StrictMode>
  )
}
