import { FilterAltOutlined, SearchOutlined } from '@mui/icons-material'

const TRANSACTIONS = [
  { id: 'TRX-9801', client: 'Juan Pérez', amount: 'Q8,750.00', channel: 'WEB', device: 'device-7842', risk: 'HIGH', riskClass: 'badge high', status: 'REVIEW_REQUIRED' },
  { id: 'TRX-9800', client: 'Ana Morales', amount: 'Q225.00', channel: 'POS', device: 'device-1902', risk: 'LOW', riskClass: 'badge low', status: 'APPROVED' },
  { id: 'TRX-9799', client: 'Carlos Ruiz', amount: 'Q13,200.00', channel: 'MOBILE', device: 'device-new', risk: 'CRITICAL', riskClass: 'badge critical', status: 'HELD' },
]

export function AnalystTransactionsPanel() {
  return (
    <section className="analyst-panel analyst-table-panel">
      <div className="analyst-panel-header">
        <div>
          <h2>Transacciones</h2>
          <p>Consulta operativa de transacciones simuladas y resultados de riesgo.</p>
        </div>
        <div className="analyst-actions">
          <button className="analyst-mini-btn" type="button">
            <SearchOutlined fontSize="inherit" />
            Buscar
          </button>
          <button className="analyst-mini-btn analyst-mini-btn-info" type="button">
            <FilterAltOutlined fontSize="inherit" />
            Filtrar
          </button>
        </div>
      </div>

      <div className="analyst-table-wrap">
        <table className="analyst-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Monto</th>
              <th>Canal</th>
              <th>Dispositivo</th>
              <th>Riesgo</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {TRANSACTIONS.map(({ id, client, amount, channel, device, risk, riskClass, status }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{client}</td>
                <td>{amount}</td>
                <td>{channel}</td>
                <td>{device}</td>
                <td><span className={riskClass}>{risk}</span></td>
                <td>{status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}