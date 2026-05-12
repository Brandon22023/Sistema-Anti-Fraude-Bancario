import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Dashboard - SentinelPay</h1>
      <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
        <p>
          <strong>Usuario:</strong> {user?.email}
        </p>
        <p>
          <strong>Rol:</strong> {user?.role}
        </p>
      </div>
      <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
        Cerrar sesión
      </button>
    </main>
  )
}
