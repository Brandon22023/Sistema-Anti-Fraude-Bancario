import { PlayArrowOutlined } from '@mui/icons-material'
import { useOutletContext } from 'react-router-dom'

export function AnalystSimulatorPanel() {
  const { onNotify } = useOutletContext()

  return (
    <section className="analyst-panel">
      <div className="analyst-panel-header">
        <div>
          <h2>Simulador de transacción</h2>
          <p>El analista puede generar una transacción simulada para validar el flujo.</p>
        </div>
        <button className="analyst-btn analyst-btn-primary" onClick={() => onNotify('Transacción evaluada', 'Risk score simulado: 78 HIGH. Alerta creada.')} type="button">
          <PlayArrowOutlined fontSize="small" />
          Evaluar transacción
        </button>
      </div>

      <div className="analyst-panel-body">
        <div className="analyst-form-grid">
          <div className="field">
            <label htmlFor="sim-client">Cliente</label>
            <input id="sim-client" type="text" defaultValue="Juan Pérez" />
          </div>
          <div className="field">
            <label htmlFor="sim-amount">Monto</label>
            <input id="sim-amount" type="text" defaultValue="Q8,750.00" />
          </div>
          <div className="field">
            <label htmlFor="sim-channel">Canal</label>
            <select id="sim-channel" defaultValue="WEB">
              <option>WEB</option>
              <option>MOBILE</option>
              <option>POS</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="sim-country">País</label>
            <select id="sim-country" defaultValue="Guatemala">
              <option>Guatemala</option>
              <option>México</option>
              <option>Colombia</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="sim-device">Dispositivo</label>
            <input id="sim-device" type="text" defaultValue="device-7842" />
          </div>
          <div className="field">
            <label htmlFor="sim-score">Score esperado</label>
            <input id="sim-score" type="number" defaultValue={78} />
          </div>
          <div className="field">
            <label htmlFor="sim-risk">Nivel</label>
            <select id="sim-risk" defaultValue="HIGH">
              <option>LOW</option>
              <option>MEDIUM</option>
              <option>HIGH</option>
              <option>CRITICAL</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="sim-state">Estado</label>
            <select id="sim-state" defaultValue="REVIEW_REQUIRED">
              <option>REVIEW_REQUIRED</option>
              <option>APPROVED</option>
              <option>HELD</option>
            </select>
          </div>
          <div className="field wide">
            <label htmlFor="sim-note">Observación</label>
            <textarea id="sim-note" defaultValue="Transacción generada para validar reglas de nueva sesión y velocidad." />
          </div>
        </div>
      </div>
    </section>
  )
}