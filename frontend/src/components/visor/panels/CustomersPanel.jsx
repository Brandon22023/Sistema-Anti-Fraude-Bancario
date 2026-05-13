const CUSTOMERS = [
  { name: 'Juan Pérez', country: 'Guatemala', accounts: '2', tx: '38', risk: 'MEDIUM', riskClass: 'badge medium', alerts: '3 activas' },
  { name: 'Ana Morales', country: 'Guatemala', accounts: '1', tx: '14', risk: 'LOW', riskClass: 'badge low', alerts: '0 activas' },
  { name: 'Carlos Ruiz', country: 'México', accounts: '3', tx: '57', risk: 'HIGH', riskClass: 'badge high', alerts: '4 activas' },
  { name: 'María Gómez', country: 'Colombia', accounts: '1', tx: '8', risk: 'LOW', riskClass: 'badge low', alerts: '1 activa' },
]

export function VisorCustomersPanel() {
  return (
    <section className="visor-panel visor-table-panel">
      <div className="visor-panel-header">
        <div>
          <h2>Clientes ficticios</h2>
          <p>Consulta de clientes, cuentas y riesgo acumulado en modo lectura.</p>
        </div>
        <span className="badge readonly">READ ONLY</span>
      </div>

      <div className="visor-table-wrap">
        <table className="visor-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>País</th>
              <th>Cuentas</th>
              <th>Transacciones</th>
              <th>Riesgo</th>
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