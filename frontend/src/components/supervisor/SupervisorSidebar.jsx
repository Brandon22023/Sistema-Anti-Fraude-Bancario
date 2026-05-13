import {
  ArticleOutlined,
  AssignmentTurnedInOutlined,
  DashboardOutlined,
  GroupsOutlined,
  HistoryOutlined,
  WarningAmberOutlined,
  SwapHorizOutlined,
} from '@mui/icons-material'
import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/supervisdor/dashoboard', label: 'Dashboard', icon: DashboardOutlined },
  { to: '/supervisdor/critical', label: 'Alertas críticas', icon: WarningAmberOutlined },
  { to: '/supervisdor/validations', label: 'Validaciones', icon: AssignmentTurnedInOutlined },
  { to: '/supervisdor/analysts', label: 'Analistas', icon: GroupsOutlined },
  { to: '/supervisdor/transactions', label: 'Transacciones', icon: SwapHorizOutlined },
  { to: '/supervisdor/reports', label: 'Reportes', icon: ArticleOutlined },
  { to: '/supervisdor/audit', label: 'Auditoría básica', icon: HistoryOutlined },
]

export function SupervisorSidebar({ user }) {
  return (
    <aside className="supervisor-sidebar">
      <div className="supervisor-brand">
        <div className="brand-mark">S</div>
        <div>
          <strong>SentinelPay</strong>
          <span>Supervisor Console</span>
        </div>
      </div>

      <div className="supervisor-card">
        <div className="role">SUPERVISOR</div>
        <h2>{user?.email?.split('@')[0] ?? 'Carlos Méndez'}</h2>
        <p>Seguimiento operativo, validación de casos críticos, reportes y auditoría básica.</p>
      </div>

      <div className="nav-title">Supervisión</div>
      <nav className="supervisor-nav">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            className={({ isActive }) => `supervisor-nav-item ${isActive ? 'active' : ''}`}
            key={to}
            to={to}
          >
            <span className="supervisor-nav-icon">
              <Icon fontSize="small" />
            </span>
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="supervisor-access-note">
        El supervisor no gestiona usuarios ni edita reglas técnicas. Su función es validar, revisar métricas y supervisar decisiones operativas.
      </div>
    </aside>
  )
}