import { AssessmentOutlined, DescriptionOutlined, HistoryOutlined } from '@mui/icons-material'

const REPORTS = [
  { title: 'Reporte ejecutivo', text: 'Resumen de supervisión y operación antifraude.', status: 'EXPORTAR', icon: AssessmentOutlined },
  { title: 'Casos validados', text: 'Alertas cerradas por analistas con revisión supervisora.', status: '67', icon: DescriptionOutlined },
  { title: 'Trazabilidad', text: 'Historial de cambios y validaciones críticas.', status: '120', icon: HistoryOutlined },
]

export function SupervisorReportsPanel() {
  return (
    <section className="supervisor-panel">
      <div className="supervisor-panel-header">
        <div>
          <h2>Reportes ejecutivos</h2>
          <p>Resumen de supervisión y operación antifraude.</p>
        </div>
      </div>

      <div className="supervisor-panel-body">
        <div className="supervisor-activity-list">
          {REPORTS.map(({ title, text, status, icon: Icon }) => (
            <div className="supervisor-activity" key={title}>
              <div className="supervisor-activity-icon">
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