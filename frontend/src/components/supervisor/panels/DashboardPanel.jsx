import { motion } from 'framer-motion'
import {
  AssignmentTurnedInOutlined,
  CheckCircleOutlineOutlined,
  SpeedOutlined,
  TrendingUpOutlined,
  WarningAmberOutlined,
} from '@mui/icons-material'

const KPI_ITEMS = [
  { label: 'Alertas críticas', value: '5', detail: 'Casos de alta prioridad pendientes de validación.', badge: 'CRITICAL', badgeClass: 'badge critical', Icon: WarningAmberOutlined },
  { label: 'Casos validados', value: '21', detail: 'Decisiones revisadas por supervisor esta semana.', badge: 'OK', badgeClass: 'badge approved', Icon: CheckCircleOutlineOutlined },
  { label: 'Tiempo promedio', value: '14m', detail: 'Tiempo medio de revisión por alerta.', badge: 'SLA', badgeClass: 'badge info', Icon: SpeedOutlined },
  { label: 'Precisión operativa', value: '92%', detail: 'Casos correctamente clasificados por analistas.', badge: '↑', badgeClass: 'badge approved', Icon: TrendingUpOutlined },
]

const PERMISSIONS = [
  { title: 'Validar decisiones', text: 'Revisar aprobaciones, descartar observaciones y pedir corrección.', icon: AssignmentTurnedInOutlined },
  { title: 'Supervisar métricas', text: 'Ver volumen, tiempos y rendimiento del equipo operativo.', icon: SpeedOutlined },
  { title: 'Consultar reportes', text: 'Abrir paneles ejecutivos y exportar resúmenes operativos.', icon: TrendingUpOutlined },
  { title: 'Auditoría básica', text: 'Ver trazabilidad sin cambiar configuración técnica.', icon: CheckCircleOutlineOutlined },
]

const QUEUE = [
  { title: 'Regla VELOCITY_10_MIN', text: 'Sigue generando eventos de revisión urgente.', status: 'URGENTE' },
  { title: 'Validación caso ALT-104', text: 'Solicitud de confirmación enviada por analista.', status: 'PENDIENTE' },
  { title: 'Reporte semanal', text: 'Resumen ejecutivo listo para exportación.', status: 'OK' },
]

export function SupervisorDashboardPanel() {
  return (
    <div>
      <div className="supervisor-kpi-grid">
        {KPI_ITEMS.map(({ label, value, detail, badge, badgeClass, Icon }) => (
          <motion.article
            className="supervisor-kpi-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={label}
            transition={{ duration: 0.18 }}
          >
            <div className="supervisor-kpi-label">
              <span>{label}</span>
              <span className={badgeClass}>{badge}</span>
            </div>
            <div className="supervisor-kpi-value-row">
              <h2 className="supervisor-kpi-value">{value}</h2>
              <Icon sx={{ color: '#06b6d4' }} />
            </div>
            <small>{detail}</small>
          </motion.article>
        ))}
      </div>

      <div className="supervisor-panel-grid">
        <section className="supervisor-panel">
          <div className="supervisor-panel-header">
            <div>
              <h2>Qué puede hacer el supervisor</h2>
              <p>Permisos principales después del login.</p>
            </div>
          </div>
          <div className="supervisor-panel-body">
            <div className="supervisor-permission-grid">
              {PERMISSIONS.map(({ title, text, icon: Icon }, index) => (
                <motion.article className="supervisor-permission-card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} key={title} transition={{ delay: index * 0.04 }}>
                  <div className="supervisor-permission-icon">
                    <Icon fontSize="small" />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="supervisor-panel">
          <div className="supervisor-panel-header">
            <div>
              <h2>Cola prioritaria</h2>
              <p>Casos más relevantes para la supervisión.</p>
            </div>
          </div>
          <div className="supervisor-panel-body">
            <div className="supervisor-activity-list">
              {QUEUE.map(({ title, text, status }) => (
                <div className="supervisor-activity" key={title}>
                  <div className="supervisor-activity-icon">!</div>
                  <div>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </div>
                  <span className="badge reviewing">{status}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}