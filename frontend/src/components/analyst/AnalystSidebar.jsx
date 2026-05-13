import {
  AccountBalanceOutlined,
  CampaignOutlined,
  DashboardOutlined,
  PlayArrowOutlined,
  ReportOutlined,
  SearchOutlined,
  SwapHorizOutlined,
} from '@mui/icons-material'
import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/analista/dashboard', label: 'Dashboard', icon: DashboardOutlined },
  { to: '/analista/alertas', label: 'Mis alertas', icon: CampaignOutlined },
  { to: '/analista/transacciones', label: 'Transacciones', icon: SwapHorizOutlined },
  { to: '/analista/detalle-riesgo', label: 'Detalle de riesgo', icon: SearchOutlined },
  { to: '/analista/clientes', label: 'Clientes', icon: AccountBalanceOutlined },
  { to: '/analista/simulador', label: 'Simulador', icon: PlayArrowOutlined },
  { to: '/analista/reportes', label: 'Reportes', icon: ReportOutlined },
]

export function AnalystSidebar({ user }) {
  return (
    <aside className="analyst-sidebar">
      <div className="analyst-brand">
        <div className="brand-mark">S</div>
        <div>
          <strong>SentinelPay</strong>
          <span>Analyst Console</span>
        </div>
      </div>

      <div className="analyst-card">
        <div className="role">ANALISTA</div>
        <h2>{user?.email?.split('@')[0] ?? 'Ana López'}</h2>
        <p>Revisión de alertas, análisis de transacciones, clientes y simulación operativa.</p>
      </div>

      <div className="nav-title">Operación antifraude</div>
      <nav className="analyst-nav">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            className={({ isActive }) => `analyst-nav-item ${isActive ? 'active' : ''}`}
            key={to}
            to={to}
          >
            <span className="analyst-nav-icon">
              <Icon fontSize="small" />
            </span>
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}