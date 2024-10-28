// import { useAuthContext } from 'providers/auth'
import { ReactNode } from 'react'
// import { Navigate } from 'react-router-dom'

type Props = {
  state: TYPES.UserState
  children: ReactNode
}

const ProtectedRoutes = ({ state, children }: Props) => {
  // const { isAuthenticated, state: currentState } = useAuthContext()

  // if (isAuthenticated && currentState !== state) {
  //   return <Navigate to="" />
  // }

  // if (!isAuthenticated && currentState !== state) {
  //   return <Navigate to="/log-in" />
  // }

  // eslint-disable-next-line sonarjs/jsx-no-useless-fragment
  return <>{children}</>
}

export default ProtectedRoutes
