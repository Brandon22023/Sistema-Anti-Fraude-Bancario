const TRANSACTIONS = [
  { id: 'TRX-2041', client: 'Juan Pérez', amount: 'Q8,750.00', channel: 'WEB', score: '96', risk: 'CRITICAL', riskClass: 'badge critical', status: 'HELD' },
  { id: 'TRX-2040', client: 'Ana Morales', amount: 'Q225.00', channel: 'POS', score: '22', risk: 'LOW', riskClass: 'badge low', status: 'APPROVED' },
  { id: 'TRX-2039', client: 'Carlos Ruiz', amount: 'Q13,200.00', channel: 'MOBILE', score: '91', risk: 'HIGH', riskClass: 'badge high', status: 'REVIEW_REQUIRED' },
  { id: 'TRX-2038', client: 'María Gómez', amount: 'Q1,430.00', channel: 'WEB', score: '41', risk: 'MEDIUM', riskClass: 'badge medium', status: 'MONITORING' },
]

export function VisorTransactionsPanel() {
  return (
    <section className="visor-panel visor-table-panel">
      <div className="visor-panel-header">
        <div>
          <h2>Transacciones</h2>
          <p>Consulta de transacciones simuladas en modo solo lectura.</p>
        </div>
        <span className="badge readonly">READ ONLY</span>
      </div>

      <div className="visor-table-wrap">
        <table className="visor-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Monto</th>
              <th>Canal</th>
              <th>Score</th>
              <th>Riesgo</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {TRANSACTIONS.map(({ id, client, amount, channel, score, risk, riskClass, status }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{client}</td>
                <td>{amount}</td>
                <td>{channel}</td>
                <td>{score}</td>
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