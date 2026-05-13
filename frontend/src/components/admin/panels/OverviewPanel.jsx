import {
  AccountBalanceOutlined,
  CampaignOutlined,
  DashboardCustomizeOutlined,
  Diversity3Outlined,
  ElectricBoltOutlined,
  HistoryOutlined,
  SettingsOutlined,
  ShieldOutlined,
} from '@mui/icons-material'
import { motion } from 'framer-motion'

const KPI_ITEMS = [
  {
    label: 'Usuarios activos',
    value: '24',
    detail: 'Administradores, analistas, supervisores y visores.',
    badge: 'OK',
    badgeClass: 'admin-badge-info',
    Icon: Diversity3Outlined,
  },
  {
    label: 'Alertas activas',
    value: '18',
    detail: 'Casos pendientes de revisión interna.',
    badge: 'HIGH',
    badgeClass: 'admin-badge-high',
    Icon: CampaignOutlined,
  },
  {
    label: 'Reglas activas',
    value: '7',
    detail: 'Motor antifraude configurado por el administrador.',
    badge: 'ON',
    badgeClass: 'admin-badge-active',
    Icon: ShieldOutlined,
  },
  {
    label: 'Risk score promedio',
    value: '46',
    detail: 'Promedio calculado en transacciones simuladas.',
    badge: 'MED',
    badgeClass: 'admin-badge-medium',
    Icon: ElectricBoltOutlined,
  },
]

const PERMISSIONS = [
  {
    title: 'Gestionar usuarios',
    text: 'Crear, editar, activar, desactivar usuarios y asignar roles internos.',
    icon: Diversity3Outlined,
  },
  {
    title: 'Configurar reglas',
    text: 'Activar, desactivar y ajustar pesos del motor antifraude.',
    icon: SettingsOutlined,
  },
  {
    title: 'Revisar alertas',
    text: 'Ver alertas críticas, cambiar estados y asignar responsables.',
    icon: CampaignOutlined,
  },
  {
    title: 'Consultar transacciones',
    text: 'Filtrar operaciones por riesgo, cliente, canal, fecha o estado.',
    icon: DashboardCustomizeOutlined,
  },
  {
    title: 'Ver auditoría',
    text: 'Revisar cambios realizados en reglas, usuarios y alertas.',
    icon: HistoryOutlined,
  },
  {
    title: 'Configurar sistema',
    text: 'Modificar parámetros globales, seguridad, CORS y opciones demo.',
    icon: AccountBalanceOutlined,
  },
]

const ACTIVITY = [
  {
    title: 'Regla NEW_DEVICE actualizada',
    text: 'Peso cambiado de 10 a 15 puntos.',
    status: 'Hace 4 min',
    statusClass: 'admin-badge-active',
    icon: ShieldOutlined,
  },
  {
    title: 'Usuario analista creado',
    text: 'Rol asignado: ANALISTA.',
    status: 'Hace 12 min',
    statusClass: 'admin-badge-active',
    icon: Diversity3Outlined,
  },
  {
    title: 'Alerta crítica asignada',
    text: 'Responsable: Ana López.',
    status: 'HIGH',
    statusClass: 'admin-badge-high',
    icon: CampaignOutlined,
  },
]

export function OverviewPanel() {
  return (
    <div>
      <div className="admin-kpi-grid">
        {KPI_ITEMS.map(({ label, value, detail, badge, badgeClass: badgeClassName, Icon }) => (
          <motion.article
            key={label}
            className="admin-kpi-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
          >
            <div className="admin-kpi-label">
              <span>{label}</span>
              <span className={`admin-badge ${badgeClassName}`}>
                {badge}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '14px' }}>
              <h2 className="admin-kpi-value">{value}</h2>
              <Icon sx={{ color: '#06b6d4' }} />
            </div>
            <small>{detail}</small>
          </motion.article>
        ))}
      </div>

      <div className="admin-panel-grid">
        <section className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <h2>Qué puede hacer el ADMIN</h2>
              <p>Permisos principales después del login.</p>
            </div>
          </div>
          <div className="admin-panel-body">
            <div className="admin-permission-grid">
              {PERMISSIONS.map(({ title, text, icon: Icon }, index) => (
                <motion.article
                  key={title}
                  className="admin-permission-card"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <div className="admin-permission-icon">
                    <Icon fontSize="small" />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <h2>Actividad reciente</h2>
              <p>Acciones administrativas simuladas.</p>
            </div>
          </div>
          <div className="admin-panel-body">
            <div className="admin-activity-list">
              {ACTIVITY.map(({ title, text, status, statusClass, icon: Icon }) => (
                <div key={title} className="admin-activity">
                  <div className="admin-activity-icon">
                    <Icon fontSize="small" />
                  </div>
                  <div>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </div>
                  <span className={`admin-badge ${statusClass}`}>{status}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}