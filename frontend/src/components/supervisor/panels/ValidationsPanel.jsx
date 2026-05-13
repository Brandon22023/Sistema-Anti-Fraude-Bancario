import { CheckCircleOutlineOutlined, CommentOutlined, ReplayOutlined } from '@mui/icons-material'

const VALIDATIONS = [
  { title: 'ALT-104', summary: 'Validación solicitada por analista.', action: 'Aprobar', actionClass: 'supervisor-mini-btn-success' },
  { title: 'ALT-103', summary: 'Revisión pendiente de evidencia adicional.', action: 'Devolver', actionClass: 'supervisor-mini-btn-warning' },
  { title: 'ALT-102', summary: 'Caso validado con observación registrada.', action: 'Cerrar', actionClass: 'supervisor-mini-btn-info' },
]

export function SupervisorValidationsPanel() {
  return (
    <section className="supervisor-panel">
      <div className="supervisor-panel-header">
        <div>
          <h2>Validaciones</h2>
          <p>El supervisor revisa aprobaciones, correcciones y observaciones del equipo.</p>
        </div>
      </div>

      <div className="supervisor-panel-body">
        <div className="supervisor-review-box">
          {VALIDATIONS.map(({ title, summary, action, actionClass }) => (
            <article className="supervisor-review-card" key={title}>
              <h3>{title}</h3>
              <p>{summary}</p>
              <div className="supervisor-actions">
                <button className={`supervisor-mini-btn ${actionClass}`} type="button">
                  <CheckCircleOutlineOutlined fontSize="inherit" />
                  {action}
                </button>
                <button className="supervisor-mini-btn" type="button">
                  <CommentOutlined fontSize="inherit" />
                  Comentar
                </button>
                <button className="supervisor-mini-btn supervisor-mini-btn-neutral" type="button">
                  <ReplayOutlined fontSize="inherit" />
                  Reasignar
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}