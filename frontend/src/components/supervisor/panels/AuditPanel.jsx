import { TimelineOutlined } from '@mui/icons-material'

const AUDIT = [
  { title: 'Cambios en validación', text: 'Revisión de casos aprobados y devueltos.', badge: '16 eventos' },
  { title: 'Accesos a reportes', text: 'Rastreo de exportaciones y vistas ejecutivas.', badge: '9 eventos' },
  { title: 'Observaciones operativas', text: 'Notas agregadas durante el control supervisado.', badge: '24 eventos' },
]

export function SupervisorAuditPanel() {
  return (
    <section className="supervisor-panel">
      <div className="supervisor-panel-header">
        <div>
          <h2>Auditoría básica</h2>
          <p>El supervisor visualiza trazabilidad operativa, sin cambiar configuración técnica.</p>
        </div>
      </div>

      <div className="supervisor-panel-body">
        <div className="supervisor-activity-list">
          {AUDIT.map(({ title, text, badge }) => (
            <div className="supervisor-activity" key={title}>
              <div className="supervisor-activity-icon">
                <TimelineOutlined fontSize="small" />
              </div>
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
  )
}