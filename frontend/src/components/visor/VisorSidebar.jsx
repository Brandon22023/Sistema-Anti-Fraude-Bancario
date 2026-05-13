import { DashboardOutlined, DescriptionOutlined, PeopleAltOutlined, ReceiptLongOutlined, LockOutlined } from '@mui/icons-material'
import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/visor/dashoboard', label: 'Dashboard', icon: DashboardOutlined },
  { to: '/visor/transactions', label: 'Transacciones', icon: ReceiptLongOutlined },
  { to: '/visor/customers', label: 'Clientes', icon: PeopleAltOutlined },
  { to: '/visor/reports', label: 'Reportes', icon: DescriptionOutlined },
  { to: '/visor/access', label: 'Permisos', icon: LockOutlined },
]

export function VisorSidebar({ user }) {
  return (
    <aside className="visor-sidebar">
      <div className="visor-brand">
        <div className="brand-mark">S</div>
        <div>
          <strong>SentinelPay</strong>
          <span>Viewer Console</span>
        </div>
      </div>

      <div className="visor-card">
        <div className="role">VISOR</div>
        <h2>{user?.email?.split('@')[0] ?? 'María Viewer'}</h2>
        <p>Acceso de solo lectura para consultar dashboard, transacciones, clientes y reportes.</p>
      </div>

      <div className="nav-title">Consulta</div>
      <nav className="visor-nav">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            className={({ isActive }) => `visor-nav-item ${isActive ? 'active' : ''}`}
            key={to}
            to={to}
          >
            <span className="visor-nav-icon">
              <Icon fontSize="small" />
            </span>
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="visor-access-note">
        El VISOR no modifica información. No resuelve alertas, no edita reglas, no crea usuarios y no cambia estados.
      </div>
    </aside>
  )
}