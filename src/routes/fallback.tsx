import { Navigate, type NavigateProps } from "react-router-dom"

export const Fallback: React.FC<FallbackProps> = props => {
  return (
    <Navigate
      replace
      {...props}
    />
  )
}

type FallbackProps = Pick<NavigateProps, "to">
