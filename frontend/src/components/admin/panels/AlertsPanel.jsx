import { AssignmentIndOutlined, VisibilityOutlined, TaskAltOutlined } from '@mui/icons-material'

const ALERTS = [
  { id: 'ALT-1028', client: 'Juan Pérez', score: '88', level: 'CRITICAL', levelClass: 'admin-badge-critical', status: 'NEW', statusClass: 'admin-badge-high', owner: 'Sin asignar', primaryAction: 'Asignar', primaryIcon: AssignmentIndOutlined, secondaryAction: 'Resolver', secondaryIcon: TaskAltOutlined },
  { id: 'ALT-1027', client: 'Ana Morales', score: '73', level: 'HIGH', levelClass: 'admin-badge-high', status: 'REVIEWING', statusClass: 'admin-badge-warning', owner: 'Ana López', primaryAction: 'Ver detalle', primaryIcon: VisibilityOutlined, secondaryAction: 'Resolver', secondaryIcon: TaskAltOutlined },
  { id: 'ALT-1026', client: 'Carlos Ruiz', score: '65', level: 'HIGH', levelClass: 'admin-badge-high', status: 'RESOLVED', statusClass: 'admin-badge-resolved', owner: 'Carlos Méndez', primaryAction: 'Ver detalle', primaryIcon: VisibilityOutlined },
]

export function AlertsPanel({ onNotify }) {
  return (
    <section className="admin-table-panel">
      <div className="admin-panel-header">
        <div>
          <h2>Gestión de alertas</h2>
          <p>El ADMIN puede ver, asignar, resolver o descartar alertas.</p>
        </div>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
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
            {ALERTS.map(({ id, client, score, level, levelClass, status, statusClass, owner, primaryAction, primaryIcon: PrimaryIcon, secondaryAction, secondaryIcon: SecondaryIcon }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{client}</td>
                <td>{score}</td>
                <td><span className={`admin-badge ${levelClass}`}>{level}</span></td>
                <td><span className={`admin-badge ${statusClass}`}>{status}</span></td>
                <td>{owner}</td>
                <td>
                  <div className="admin-actions">
                    <button className="admin-mini-btn" type="button" onClick={() => onNotify('Detalle abierto', `Se abrió ${id} para revisión.`)}>
                      <PrimaryIcon fontSize="inherit" />
                      {primaryAction}
                    </button>
                    {secondaryAction ? (
                      <button className="admin-mini-btn admin-mini-btn-success" type="button" onClick={() => onNotify('Caso resuelto', `${id} fue marcado como resuelto.`)}>
                        <SecondaryIcon fontSize="inherit" />
                        {secondaryAction}
                      </button>
                    ) : null}
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