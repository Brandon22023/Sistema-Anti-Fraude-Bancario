import { AssessmentOutlined, DescriptionOutlined, HistoryOutlined } from '@mui/icons-material'

const REPORTS = [
  { title: 'Reporte ejecutivo', text: 'Resumen de supervisión y operación antifraude.', status: '3 reportes', icon: AssessmentOutlined },
  { title: 'Alertas visibles', text: 'Casos consultables sin intervención operativa.', status: '18 casos', icon: DescriptionOutlined },
  { title: 'Trazabilidad', text: 'Historial de cambios y observaciones visibles.', status: '120 eventos', icon: HistoryOutlined },
]

export function VisorReportsPanel() {
  return (
    <section className="visor-panel">
      <div className="visor-panel-header">
        <div>
          <h2>Reportes consultivos</h2>
          <p>El visor puede consultar reportes, no modificar ni aprobar decisiones.</p>
        </div>
      </div>

      <div className="visor-panel-body">
        <div className="visor-activity-list">
          {REPORTS.map(({ title, text, status, icon: Icon }) => (
            <div className="visor-activity" key={title}>
              <div className="visor-activity-icon">
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