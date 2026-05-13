import { motion } from 'framer-motion'
import { VisibilityOutlined, ReceiptLongOutlined, TimelineOutlined, ShieldOutlined, LockOutlined, BlockOutlined } from '@mui/icons-material'

const KPI_ITEMS = [
  { label: 'Transacciones vistas', value: '1,284', detail: 'Consulta general del historial simulado.', badge: 'READ', badgeClass: 'badge info', Icon: VisibilityOutlined },
  { label: 'Alertas visibles', value: '18', detail: 'Solo consulta, sin cambio de estado.', badge: 'HIGH', badgeClass: 'badge high', Icon: BlockOutlined },
  { label: 'Risk score promedio', value: '46', detail: 'Resumen de riesgo transaccional.', badge: 'MED', badgeClass: 'badge medium', Icon: TimelineOutlined },
  { label: 'Acceso', value: 'Solo lectura', detail: 'Sin permisos administrativos u operativos.', badge: 'VISOR', badgeClass: 'badge viewer', Icon: LockOutlined },
]

const PERMISSIONS = [
  { title: 'Puede ver dashboard', text: 'Consulta de métricas, KPIs y estado general.', icon: ShieldOutlined, status: 'PERMITIDO' },
  { title: 'Puede ver transacciones', text: 'Consulta sin cambios de estado.', icon: ReceiptLongOutlined, status: 'PERMITIDO' },
  { title: 'Puede ver reportes', text: 'Resumen ejecutivo y analítico.', icon: VisibilityOutlined, status: 'PERMITIDO' },
  { title: 'No puede modificar', text: 'Sin permisos para alertas, reglas o usuarios.', icon: BlockOutlined, status: 'BLOQUEADO' },
]

const SUMMARY = [
  { title: 'Actividad visible', text: 'Vista general de la operación antifraude.', badge: 'READ ONLY' },
  { title: 'Alertas visibles', text: 'Casos que el visor puede consultar sin intervenir.', badge: '18 casos' },
  { title: 'Reportes disponibles', text: 'Paneles consultivos para seguimiento operativo.', badge: '3 reportes' },
]

export function VisorDashboardPanel() {
  return (
    <div>
      <div className="visor-kpi-grid">
        {KPI_ITEMS.map(({ label, value, detail, badge, badgeClass, Icon }) => (
          <motion.article
            className="visor-kpi-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={label}
            transition={{ duration: 0.18 }}
          >
            <div className="visor-kpi-label">
              <span>{label}</span>
              <span className={badgeClass}>{badge}</span>
            </div>
            <div className="visor-kpi-value-row">
              <h2 className="visor-kpi-value">{value}</h2>
              <Icon sx={{ color: '#06b6d4' }} />
            </div>
            <small>{detail}</small>
          </motion.article>
        ))}
      </div>

      <div className="visor-panel-grid">
        <section className="visor-panel">
          <div className="visor-panel-header">
            <div>
              <h2>Qué puede hacer el VISOR</h2>
              <p>Permisos principales después del login.</p>
            </div>
          </div>
          <div className="visor-panel-body">
            <div className="visor-permission-grid">
              {PERMISSIONS.map(({ title, text, icon: Icon, status }, index) => (
                <motion.article className={`visor-permission-card ${status === 'BLOQUEADO' ? 'blocked' : ''}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} key={title} transition={{ delay: index * 0.04 }}>
                  <div className="icon">
                    <Icon fontSize="small" />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span className={`badge ${status === 'PERMITIDO' ? 'ok' : 'readonly'}`}>{status}</span>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="visor-panel">
          <div className="visor-panel-header">
            <div>
              <h2>Resumen visible</h2>
              <p>Información disponible para consulta.</p>
            </div>
          </div>
          <div className="visor-panel-body">
            <div className="visor-activity-list">
              {SUMMARY.map(({ title, text, badge }) => (
                <div className="visor-activity" key={title}>
                  <div className="visor-activity-icon">•</div>
                  <div>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </div>
                  <span className="badge readonly">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}