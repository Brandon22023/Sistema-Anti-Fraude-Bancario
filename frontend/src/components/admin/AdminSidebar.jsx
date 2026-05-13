import {
  AccountBalanceOutlined,
  CampaignOutlined,
  FactCheckOutlined,
  PeopleAltOutlined,
  QueryStatsOutlined,
  SettingsOutlined,
  DashboardOutlined,
  SwapHorizOutlined,
} from '@mui/icons-material'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', Icon: DashboardOutlined },
  { id: 'users', label: 'Usuarios y roles', Icon: PeopleAltOutlined },
  { id: 'rules', label: 'Reglas antifraude', Icon: SettingsOutlined },
  { id: 'alerts', label: 'Alertas', Icon: CampaignOutlined },
  { id: 'transactions', label: 'Transacciones', Icon: SwapHorizOutlined },
  { id: 'customers', label: 'Clientes y cuentas', Icon: AccountBalanceOutlined },
  { id: 'audit', label: 'Auditoría', Icon: FactCheckOutlined },
  { id: 'settings', label: 'Configuración', Icon: QueryStatsOutlined },
]

export function AdminSidebar({ activeSection, onSelectSection, user }) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <div className="admin-brand-mark">S</div>
        <div>
          <strong>SentinelPay</strong>
          <span>Admin Console</span>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-role-chip">ADMIN</div>
        <h2>{user?.email?.split('@')[0] ?? 'Admin'}</h2>
        <p>Acceso total al sistema: usuarios, reglas, alertas, auditoría y configuración.</p>
      </div>

      <div className="admin-nav-title">Panel principal</div>
      <nav className="admin-nav">
        {NAV_ITEMS.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`admin-nav-item ${activeSection === id ? 'active' : ''}`}
            onClick={() => onSelectSection(id)}
            type="button"
          >
            <span className="admin-nav-icon">
              <Icon fontSize="small" />
            </span>
            {label}
          </button>
        ))}
      </nav>
    </aside>
  )
}