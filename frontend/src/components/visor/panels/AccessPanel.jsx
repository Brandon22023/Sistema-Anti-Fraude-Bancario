const ACCESS_ITEMS = [
  { icon: '✓', title: 'Puede ver dashboard', description: 'Consulta de métricas, KPIs y estado general.', badge: 'PERMITIDO' },
  { icon: '✓', title: 'Puede ver transacciones', description: 'Consulta sin cambios de estado.', badge: 'PERMITIDO' },
  { icon: '✓', title: 'Puede ver reportes', description: 'Resumen ejecutivo y analítico.', badge: 'PERMITIDO' },
  { icon: '×', title: 'No puede resolver alertas', description: 'Sin permisos operativos de revisión.', badge: 'BLOQUEADO' },
  { icon: '×', title: 'No puede editar reglas', description: 'Sin acceso a configuración antifraude.', badge: 'BLOQUEADO' },
  { icon: '×', title: 'No puede administrar usuarios', description: 'Sin permisos administrativos.', badge: 'BLOQUEADO' },
]

export function VisorAccessPanel() {
  return (
    <section className="visor-panel">
      <div className="visor-panel-header">
        <div>
          <h2>Permisos del VISOR</h2>
          <p>Resumen claro de lo permitido y bloqueado para este rol.</p>
        </div>
      </div>

      <div className="visor-panel-body">
        <div className="visor-activity-list">
          {ACCESS_ITEMS.map((item) => (
            <div className="visor-activity" key={item.title}>
              <div className={`visor-activity-icon ${item.badge === 'BLOQUEADO' ? 'blocked' : ''}`}>{item.icon}</div>
              <div>
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </div>
              <span className={`badge ${item.badge === 'PERMITIDO' ? 'ok' : 'readonly'}`}>{item.badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}