import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { AdminShell } from '../components/admin/AdminShell'
import { LogoutOutlined, ShieldOutlined } from '@mui/icons-material'
import { Navigate } from 'react-router-dom'

function SimpleUserDashboard({ user, onLogout }) {
  return (
    <main className="admin-shell" style={{ gridTemplateColumns: '1fr' }}>
      <section style={{ minHeight: '100vh', padding: '32px', display: 'grid', placeItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          style={{ width: 'min(720px, 100%)' }}
        >
          <div className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <h2>Sesión activa</h2>
                <p>Vista reducida para usuarios sin rol ADMIN.</p>
              </div>
              <span className="admin-badge admin-badge-info">{user?.role}</span>
            </div>
            <div className="admin-panel-body" style={{ display: 'grid', gap: '18px' }}>
              <div className="admin-card" style={{ background: '#f8fafc', color: '#0f172a', marginBottom: 0 }}>
                <div className="admin-role-chip">
                  <ShieldOutlined fontSize="small" />
                  Acceso autenticado
                </div>
                <h2 style={{ color: '#0f172a' }}>Bienvenido, {user?.email}</h2>
                <p style={{ color: '#64748b' }}>Tu rol actual es {user?.role}. El panel administrativo completo se reserva para ADMIN.</p>
              </div>
              <button className="admin-btn admin-btn-primary" onClick={onLogout} type="button" style={{ width: 'fit-content' }}>
                <LogoutOutlined fontSize="small" />
                Cerrar sesión
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  )
}

export function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (user?.role === 'ADMIN') {
    return <AdminShell user={user} onLogout={handleLogout} />
  }

  if (user?.role === 'ANALISTA') {
    return <Navigate to="/analista/dashboard" replace />
  }

  return <SimpleUserDashboard user={user} onLogout={handleLogout} />
}
