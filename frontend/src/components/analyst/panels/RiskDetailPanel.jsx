const RULES = [
  { label: 'Monto superior al promedio', value: '25 puntos' },
  { label: 'Dispositivo nuevo', value: '15 puntos' },
  { label: 'Muchas operaciones recientes', value: '20 puntos' },
  { label: 'Ubicación inusual', value: '28 puntos' },
]

export function AnalystRiskDetailPanel() {
  return (
    <div className="analyst-detail-grid">
      <section className="analyst-panel">
        <div className="analyst-panel-header">
          <div>
            <h2>Análisis antifraude</h2>
            <p>Detalle del caso y factores que dispararon la alerta.</p>
          </div>
          <span className="badge critical">88 CRITICAL</span>
        </div>
        <div className="analyst-panel-body">
          <div className="analyst-detail-grid-mini">
            <div className="analyst-detail-box">
              <small>Cliente</small>
              <strong>Juan Pérez</strong>
            </div>
            <div className="analyst-detail-box">
              <small>Transacción</small>
              <strong>TRX-9801</strong>
            </div>
            <div className="analyst-detail-box">
              <small>Canal</small>
              <strong>WEB</strong>
            </div>
            <div className="analyst-detail-box">
              <small>Dispositivo</small>
              <strong>device-7842</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="analyst-panel">
        <div className="analyst-panel-header">
          <div>
            <h2>Reglas que dispararon la alerta</h2>
            <p>Desglose del score para la revisión del caso.</p>
          </div>
        </div>
        <div className="analyst-panel-body">
          <div className="analyst-rule-list">
            {RULES.map((rule) => (
              <div className="analyst-rule-item" key={rule.label}>
                <div>
                  <strong>{rule.label}</strong>
                  <span>Peso incluido en el score final</span>
                </div>
                <span className="badge reviewing">{rule.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}