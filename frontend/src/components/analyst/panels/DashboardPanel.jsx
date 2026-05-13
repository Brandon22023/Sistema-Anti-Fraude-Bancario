import {
  AnalyticsOutlined,
  CampaignOutlined,
  CheckCircleOutlineOutlined,
  ElectricBoltOutlined,
  FindInPageOutlined,
  SecurityOutlined,
} from '@mui/icons-material'
import { motion } from 'framer-motion'

const KPI_ITEMS = [
  { label: 'Alertas asignadas', value: '12', detail: 'Casos asignados al analista.', badge: 'REVIEW', badgeClass: 'badge reviewing', Icon: CampaignOutlined },
  { label: 'Críticas', value: '3', detail: 'Requieren atención prioritaria.', badge: 'CRITICAL', badgeClass: 'badge critical', Icon: SecurityOutlined },
  { label: 'Resueltas hoy', value: '9', detail: 'Alertas cerradas con observación.', badge: 'OK', badgeClass: 'badge ok', Icon: CheckCircleOutlineOutlined },
  { label: 'Risk score promedio', value: '62', detail: 'Promedio de casos revisados.', badge: 'MED', badgeClass: 'badge medium', Icon: ElectricBoltOutlined },
]

const PERMISSIONS = [
  { title: 'Revisar alertas', text: 'Ver, comentar, resolver o descartar alertas asignadas.', icon: CampaignOutlined },
  { title: 'Analizar transacciones', text: 'Inspeccionar transacciones con score de riesgo y canal.', icon: AnalyticsOutlined },
  { title: 'Ver detalle', text: 'Abrir el detalle del caso y las reglas que lo dispararon.', icon: FindInPageOutlined },
  { title: 'Consultar clientes', text: 'Revisar cuentas, historial y alertas relacionadas.', icon: SecurityOutlined },
]

const QUEUE = [
  { title: 'Transacción TRX-9801', text: 'Riesgo HIGH, revisión manual pendiente.', status: 'URGENTE' },
  { title: 'Cliente Juan Pérez', text: 'Actividad inusual durante la última hora.', status: 'FOLLOW-UP' },
  { title: 'Regla VELOCITY_10_MIN', text: 'Incremento de eventos por ventana de 10 minutos.', status: 'ALERTA' },
]

export function AnalystDashboardPanel() {
  return (
    <div>
      <div className="analyst-kpi-grid">
        {KPI_ITEMS.map(({ label, value, detail, badge, badgeClass, Icon }) => (
          <motion.article
            className="analyst-kpi-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={label}
            transition={{ duration: 0.18 }}
          >
            <div className="analyst-kpi-label">
              <span>{label}</span>
              <span className={badgeClass}>{badge}</span>
            </div>
            <div className="analyst-kpi-value-row">
              <h2 className="analyst-kpi-value">{value}</h2>
              <Icon sx={{ color: '#06b6d4' }} />
            </div>
            <small>{detail}</small>
          </motion.article>
        ))}
      </div>

      <div className="analyst-panel-grid">
        <section className="analyst-panel">
          <div className="analyst-panel-header">
            <div>
              <h2>Qué puede hacer el ANALISTA</h2>
              <p>Permisos principales después del login.</p>
            </div>
          </div>
          <div className="analyst-panel-body">
            <div className="analyst-permission-grid">
              {PERMISSIONS.map(({ title, text, icon: Icon }, index) => (
                <motion.article className="analyst-permission-card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} key={title} transition={{ delay: index * 0.04 }}>
                  <div className="analyst-permission-icon">
                    <Icon fontSize="small" />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="analyst-panel">
          <div className="analyst-panel-header">
            <div>
              <h2>Cola prioritaria</h2>
              <p>Alertas que debe revisar el analista.</p>
            </div>
          </div>
          <div className="analyst-panel-body">
            <div className="analyst-activity-list">
              {QUEUE.map(({ title, text, status }) => (
                <div className="analyst-activity" key={title}>
                  <div className="analyst-activity-icon">!</div>
                  <div>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </div>
                  <span className="analyst-badge analyst-badge-warning">{status}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}