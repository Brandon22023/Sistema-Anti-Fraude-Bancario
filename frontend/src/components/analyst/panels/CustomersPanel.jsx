const CUSTOMERS = [
  { name: 'Juan Pérez', country: 'Guatemala', accounts: '2', tx: '38', risk: 'MEDIUM', riskClass: 'badge medium', alerts: '3 activas' },
  { name: 'Ana Morales', country: 'Guatemala', accounts: '1', tx: '14', risk: 'LOW', riskClass: 'badge low', alerts: '0 activas' },
  { name: 'Carlos Ruiz', country: 'México', accounts: '3', tx: '57', risk: 'HIGH', riskClass: 'badge high', alerts: '4 activas' },
]

export function AnalystCustomersPanel() {
  return (
    <section className="analyst-panel analyst-table-panel">
      <div className="analyst-panel-header">
        <div>
          <h2>Clientes</h2>
          <p>Consulta de clientes ficticios, cuentas, riesgo e historial.</p>
        </div>
      </div>

      <div className="analyst-table-wrap">
        <table className="analyst-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>País</th>
              <th>Cuentas</th>
              <th>Transacciones</th>
              <th>Riesgo promedio</th>
              <th>Alertas</th>
            </tr>
          </thead>
          <tbody>
            {CUSTOMERS.map(({ name, country, accounts, tx, risk, riskClass, alerts }) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{country}</td>
                <td>{accounts}</td>
                <td>{tx}</td>
                <td><span className={riskClass}>{risk}</span></td>
                <td>{alerts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}