import { useContext, useCallback, useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'

const DEMO_USERS = [
  { email: 'admin@sentinelpay.com', password: 'admin123', role: 'ADMIN' },
  { email: 'analyst@sentinelpay.com', password: 'admin123', role: 'ANALISTA' },
  { email: 'supervisor@sentinelpay.com', password: 'admin123', role: 'SUPERVISOR' },
  { email: 'viewer@sentinelpay.com', password: 'admin123', role: 'VISOR' },
]

export function useAuthProvider() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Cargar sesión al montar el componente
  useEffect(() => {
    const storedSession = localStorage.getItem('sentinelpay_session')
    if (storedSession) {
      try {
        const session = JSON.parse(storedSession)
        setUser(session)
      } catch (error) {
        console.error('Error al cargar sesión:', error)
        localStorage.removeItem('sentinelpay_session')
      }
    }
    setLoading(false)
  }, [])

  const createDemoJwt = useCallback((userObj) => {
    return btoa(
      JSON.stringify({
        sub: userObj.email,
        role: userObj.role,
        iat: Date.now(),
        iss: 'sentinelpay-demo-frontend',
      }),
    )
  }, [])

  const login = useCallback(
    (email, password, rememberDevice = true) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const normalizedEmail = email.trim().toLowerCase()
          const foundUser = DEMO_USERS.find(
            (item) => item.email === normalizedEmail && item.password === password.trim(),
          )

          if (!foundUser) {
            reject(new Error('Acceso denegado. Verifica las credenciales ingresadas.'))
            return
          }

          const session = {
            email: foundUser.email,
            role: foundUser.role,
            token: createDemoJwt(foundUser),
            rememberDevice,
          }

          localStorage.setItem('sentinelpay_session', JSON.stringify(session))
          setUser(session)
          resolve(session)
        }, 750)
      })
    },
    [createDemoJwt],
  )

  const logout = useCallback(() => {
    localStorage.removeItem('sentinelpay_session')
    setUser(null)
  }, [])

  const isAuthenticated = !!user
  const userRole = user?.role

  return {
    user,
    loading,
    isAuthenticated,
    userRole,
    login,
    logout,
  }
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}
