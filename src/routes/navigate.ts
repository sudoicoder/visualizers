import { useCallback } from "react"
import { useNavigate as useBaseNavigate } from "react-router-dom"
import { getPath, type KnownRouteName } from "./paths"

export const useNavigate = () => {
  const navigate = useBaseNavigate()
  return useCallback(
    (routeName: KnownRouteName) => navigate(getPath(routeName)),
    [navigate]
  )
}
