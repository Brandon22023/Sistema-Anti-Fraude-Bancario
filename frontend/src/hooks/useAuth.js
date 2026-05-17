import { useContext, useCallback, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_ANTI_FRAUDE_API_URL ||
  'http://localhost:5240'
).replace(/\/$/, '')

function readStoredSession() {
  const storedSession = localStorage.getItem('sentinelpay_session') || sessionStorage.getItem('sentinelpay_session')

  if (!storedSession) {
    return null
  }

  try {
    return JSON.parse(storedSession)
  } catch (error) {
    console.error('Error al cargar sesión:', error)
    localStorage.removeItem('sentinelpay_session')
    sessionStorage.removeItem('sentinelpay_session')
    return null
  }
}

export function useAuthProvider() {
  const [user, setUser] = useState(() => readStoredSession())
  const [loading, setLoading] = useState(false)

  const login = useCallback(
    async (email, password, rememberDevice = true) => {
      setLoading(true)

      try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            rememberDevice,
          }),
        })

        const data = await response.json().catch(() => null)

        if (!response.ok) {
          throw new Error(data?.detail || data?.message || 'Acceso denegado. Verifica las credenciales ingresadas.')
        }

        const session = {
          userId: data.userId,
          fullName: data.fullName,
          email: data.email,
          role: data.role,
          token: data.token,
          tokenType: data.tokenType,
          expiresAt: data.expiresAt,
          rememberDevice,
        }

        const storage = rememberDevice ? localStorage : sessionStorage
        const otherStorage = rememberDevice ? sessionStorage : localStorage

        storage.setItem('sentinelpay_session', JSON.stringify(session))
        otherStorage.removeItem('sentinelpay_session')
        setUser(session)

        return session
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const logout = useCallback(() => {
    localStorage.removeItem('sentinelpay_session')
    sessionStorage.removeItem('sentinelpay_session')
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
