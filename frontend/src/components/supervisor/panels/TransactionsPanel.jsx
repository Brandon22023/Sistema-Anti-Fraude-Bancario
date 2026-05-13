import { FilterAltOutlined, SearchOutlined } from '@mui/icons-material'

const TRANSACTIONS = [
  { id: 'TRX-1042', client: 'Juan Pérez', amount: 'Q8,750.00', channel: 'WEB', risk: 'CRITICAL', status: 'HELD' },
  { id: 'TRX-1041', client: 'Ana Morales', amount: 'Q225.00', channel: 'POS', risk: 'LOW', status: 'APPROVED' },
  { id: 'TRX-1040', client: 'Carlos Ruiz', amount: 'Q13,200.00', channel: 'MOBILE', risk: 'HIGH', status: 'REVIEW_REQUIRED' },
]

export function SupervisorTransactionsPanel() {
  return (
    <section className="supervisor-panel supervisor-table-panel">
      <div className="supervisor-panel-header">
        <div>
          <h2>Transacciones supervisadas</h2>
          <p>Consulta de transacciones para revisión gerencial y operativa.</p>
        </div>
        <div className="supervisor-actions">
          <button className="supervisor-mini-btn" type="button">
            <SearchOutlined fontSize="inherit" />
            Buscar
          </button>
          <button className="supervisor-mini-btn supervisor-mini-btn-info" type="button">
            <FilterAltOutlined fontSize="inherit" />
            Filtrar
          </button>
        </div>
      </div>

      <div className="supervisor-table-wrap">
        <table className="supervisor-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Monto</th>
              <th>Canal</th>
              <th>Riesgo</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {TRANSACTIONS.map(({ id, client, amount, channel, risk, status }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{client}</td>
                <td>{amount}</td>
                <td>{channel}</td>
                <td><span className={risk === 'CRITICAL' ? 'badge critical' : 'badge high'}>{risk}</span></td>
                <td>{status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}