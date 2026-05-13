import { SaveOutlined } from '@mui/icons-material'

export function SettingsPanel({ onNotify }) {
  return (
    <section className="admin-table-panel">
      <div className="admin-panel-header">
        <div>
          <h2>Configuración administrativa</h2>
          <p>Parámetros globales del sistema simulado.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => onNotify('Configuración guardada', 'Los parámetros demo fueron actualizados.')} type="button">
          <SaveOutlined fontSize="small" />
          Guardar configuración
        </button>
      </div>

      <div className="admin-panel-body">
        <div className="admin-form-grid">
          <div className="admin-field">
            <label htmlFor="jwt-expiration">Tiempo de expiración JWT</label>
            <select id="jwt-expiration" defaultValue="30 minutos">
              <option>30 minutos</option>
              <option>1 hora</option>
              <option>2 horas</option>
            </select>
          </div>

          <div className="admin-field">
            <label htmlFor="critical-threshold">Umbral crítico global</label>
            <input id="critical-threshold" type="number" defaultValue={81} />
          </div>

          <div className="admin-field">
            <label htmlFor="frontend-domain">Dominio frontend permitido</label>
            <input id="frontend-domain" type="text" defaultValue="http://localhost:5173" />
          </div>

          <div className="admin-field">
            <label htmlFor="simulation-mode">Modo de simulación</label>
            <select id="simulation-mode" defaultValue="Activado">
              <option>Activado</option>
              <option>Desactivado</option>
            </select>
          </div>

          <div className="admin-field admin-wide">
            <label htmlFor="system-message">Mensaje interno del sistema</label>
            <textarea id="system-message" defaultValue="Plataforma interna de monitoreo antifraude. No procesa dinero ni datos bancarios reales." />
          </div>
        </div>
      </div>
    </section>
  )
}