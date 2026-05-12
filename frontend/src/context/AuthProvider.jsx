import { AuthContext } from './AuthContext'
import { useAuthProvider } from '../hooks/useAuth'

export function AuthProvider({ children }) {
  const authState = useAuthProvider()

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
}
