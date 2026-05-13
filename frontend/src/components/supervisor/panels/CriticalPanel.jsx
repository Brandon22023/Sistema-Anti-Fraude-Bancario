import { AssignmentTurnedInOutlined, VisibilityOutlined } from '@mui/icons-material'

const CRITICAL_ALERTS = [
  { id: 'ALT-104', client: 'Juan Pérez', score: '96', channel: 'WEB', amount: 'Q8,750.00', owner: 'Ana López', status: 'NEW' },
  { id: 'ALT-103', client: 'Carlos Ruiz', score: '91', channel: 'MOBILE', amount: 'Q13,200.00', owner: 'Carlos Méndez', status: 'REVIEWING' },
  { id: 'ALT-102', client: 'Ana Morales', score: '88', channel: 'POS', amount: 'Q2,240.00', owner: 'Carlos Méndez', status: 'PENDING' },
]

export function SupervisorCriticalPanel() {
  return (
    <section className="supervisor-panel supervisor-table-panel">
      <div className="supervisor-panel-header">
        <div>
          <h2>Alertas críticas</h2>
          <p>El supervisor revisa casos HIGH y CRITICAL para seguimiento prioritario.</p>
        </div>
      </div>

      <div className="supervisor-table-wrap">
        <table className="supervisor-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Risk score</th>
              <th>Canal</th>
              <th>Monto</th>
              <th>Analista</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {CRITICAL_ALERTS.map(({ id, client, score, channel, amount, owner, status }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{client}</td>
                <td><span className="badge critical">{score}</span></td>
                <td>{channel}</td>
                <td>{amount}</td>
                <td>{owner}</td>
                <td><span className="badge reviewing">{status}</span></td>
                <td>
                  <div className="supervisor-actions">
                    <button className="supervisor-mini-btn" type="button">
                      <VisibilityOutlined fontSize="inherit" />
                      Ver caso
                    </button>
                    <button className="supervisor-mini-btn supervisor-mini-btn-success" type="button">
                      <AssignmentTurnedInOutlined fontSize="inherit" />
                      Validar
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