const ANALYSTS = [
  { name: 'Ana López', load: '7 casos', sla: '12m', quality: '94%', badge: 'TOP' },
  { name: 'Carlos Méndez', load: '5 casos', sla: '16m', quality: '91%', badge: 'OK' },
  { name: 'María Pérez', load: '9 casos', sla: '18m', quality: '88%', badge: 'WATCH' },
]

export function SupervisorAnalystsPanel() {
  return (
    <section className="supervisor-panel supervisor-table-panel">
      <div className="supervisor-panel-header">
        <div>
          <h2>Rendimiento de analistas</h2>
          <p>El supervisor ve productividad, carga y calidad de revisión.</p>
        </div>
      </div>

      <div className="supervisor-table-wrap">
        <table className="supervisor-table">
          <thead>
            <tr>
              <th>Analista</th>
              <th>Carga</th>
              <th>SLA</th>
              <th>Calidad</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {ANALYSTS.map(({ name, load, sla, quality, badge }) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{load}</td>
                <td>{sla}</td>
                <td>{quality}</td>
                <td><span className="badge info">{badge}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}