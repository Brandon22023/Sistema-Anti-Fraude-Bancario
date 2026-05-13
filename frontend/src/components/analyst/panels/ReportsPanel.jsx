import { AssessmentOutlined, HistoryOutlined, TaskAltOutlined } from '@mui/icons-material'

const REPORTS = [
  { title: 'Casos revisados', text: 'Resumen del volumen de alertas tratadas.', status: '42 casos', icon: AssessmentOutlined },
  { title: 'Resoluciones', text: 'Alertas resueltas con evidencia adjunta.', status: '31 OK', icon: TaskAltOutlined },
  { title: 'Trazabilidad', text: 'Historial de cambios y observaciones.', status: '120 eventos', icon: HistoryOutlined },
]

export function AnalystReportsPanel() {
  return (
    <section className="analyst-panel">
      <div className="analyst-panel-header">
        <div>
          <h2>Reportes operativos</h2>
          <p>Resumen del trabajo del analista y casos revisados.</p>
        </div>
      </div>

      <div className="analyst-panel-body">
        <div className="analyst-activity-list">
          {REPORTS.map(({ title, text, status, icon: Icon }) => (
            <div className="analyst-activity" key={title}>
              <div className="analyst-activity-icon">
                <Icon fontSize="small" />
              </div>
              <div>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
              <span className="badge info">{status}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}