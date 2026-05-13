import { AssignmentTurnedInOutlined, CommentOutlined, VisibilityOutlined } from '@mui/icons-material'
import { useOutletContext } from 'react-router-dom'

const ALERTS = [
  { id: 'ALT-2021', client: 'Juan Pérez', score: '88', level: 'CRITICAL', levelClass: 'analyst-badge-critical', status: 'NEW', statusClass: 'badge new', owner: 'Sin asignar' },
  { id: 'ALT-2020', client: 'Ana Morales', score: '73', level: 'HIGH', levelClass: 'badge high', status: 'REVIEWING', statusClass: 'badge reviewing', owner: 'Ana López' },
  { id: 'ALT-2019', client: 'Carlos Ruiz', score: '65', level: 'HIGH', levelClass: 'badge high', status: 'RESOLVED', statusClass: 'badge resolved', owner: 'Carlos Méndez' },
]

export function AnalystAlertsPanel() {
  const { onNotify } = useOutletContext()

  return (
    <section className="analyst-panel analyst-table-panel">
      <div className="analyst-panel-header">
        <div>
          <h2>Mis alertas</h2>
          <p>El analista puede revisar, resolver, descartar y comentar alertas.</p>
        </div>
      </div>

      <div className="analyst-table-wrap">
        <table className="analyst-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Risk score</th>
              <th>Nivel</th>
              <th>Estado</th>
              <th>Responsable</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ALERTS.map(({ id, client, score, level, levelClass, status, statusClass, owner }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{client}</td>
                <td>{score}</td>
                <td><span className={levelClass}>{level}</span></td>
                <td><span className={statusClass}>{status}</span></td>
                <td>{owner}</td>
                <td>
                  <div className="analyst-actions">
                    <button className="analyst-mini-btn" type="button" onClick={() => onNotify('Detalle abierto', `Se abrió ${id} para revisión.`)}>
                      <VisibilityOutlined fontSize="inherit" />
                      Ver detalle
                    </button>
                    <button className="analyst-mini-btn analyst-mini-btn-success" type="button" onClick={() => onNotify('Caso resuelto', `${id} fue marcado como resuelto.`)}>
                      <AssignmentTurnedInOutlined fontSize="inherit" />
                      Resolver
                    </button>
                    <button className="analyst-mini-btn analyst-mini-btn-warning" type="button" onClick={() => onNotify('Comentario agregado', `Se añadió observación a ${id}.`)}>
                      <CommentOutlined fontSize="inherit" />
                      Comentar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}