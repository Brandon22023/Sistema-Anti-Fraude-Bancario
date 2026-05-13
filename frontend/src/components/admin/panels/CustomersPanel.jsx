import { ManageAccountsOutlined } from '@mui/icons-material'

const CUSTOMERS = [
  { name: 'Juan Pérez', country: 'Guatemala', accounts: '2', tx: '38', risk: 'MEDIUM', riskClass: 'admin-badge-medium', alerts: '3 activas' },
  { name: 'Ana Morales', country: 'Guatemala', accounts: '1', tx: '14', risk: 'LOW', riskClass: 'admin-badge-low', alerts: '0 activas' },
  { name: 'Carlos Ruiz', country: 'México', accounts: '3', tx: '57', risk: 'HIGH', riskClass: 'admin-badge-high', alerts: '4 activas' },
]

export function CustomersPanel() {
  return (
    <section className="admin-table-panel">
      <div className="admin-panel-header">
        <div>
          <h2>Clientes y cuentas ficticias</h2>
          <p>El ADMIN puede consultar perfiles de riesgo, cuentas y alertas relacionadas.</p>
        </div>
        <button className="admin-mini-btn" type="button">
          <ManageAccountsOutlined fontSize="inherit" />
          Gestionar perfiles
        </button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
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
                <td><span className={`admin-badge ${riskClass}`}>{risk}</span></td>
                <td>{alerts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}