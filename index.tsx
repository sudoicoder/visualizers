import { createRoot } from "react-dom/client"
import { Root } from "./src/Root.js"

const element = document.getElementById("root")!
const root = createRoot(element)
root.render(<Root />)
