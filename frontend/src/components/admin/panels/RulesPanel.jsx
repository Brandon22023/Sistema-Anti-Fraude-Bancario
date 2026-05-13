import { EditOutlined, PlayArrowOutlined, SaveOutlined } from '@mui/icons-material'

const RULES = [
  { code: 'AMOUNT_ABOVE_AVG', name: 'Monto superior al promedio', weight: '25', threshold: '150%', status: 'ACTIVA', statusClass: 'admin-badge-info', action: 'Desactivar', actionClass: 'admin-mini-btn-danger', actionIcon: PlayArrowOutlined },
  { code: 'NEW_DEVICE', name: 'Dispositivo nuevo', weight: '15', threshold: 'Sin historial', status: 'ACTIVA', statusClass: 'admin-badge-info', action: 'Desactivar', actionClass: 'admin-mini-btn-danger', actionIcon: PlayArrowOutlined },
  { code: 'VELOCITY_10_MIN', name: 'Muchas operaciones recientes', weight: '20', threshold: '5 operaciones', status: 'ACTIVA', statusClass: 'admin-badge-info', action: 'Desactivar', actionClass: 'admin-mini-btn-danger', actionIcon: PlayArrowOutlined },
  { code: 'UNUSUAL_COUNTRY', name: 'País o ubicación inusual', weight: '15', threshold: 'País no habitual', status: 'INACTIVA', statusClass: 'admin-badge-disabled', action: 'Activar', actionClass: 'admin-mini-btn-success', actionIcon: PlayArrowOutlined },
]

export function RulesPanel({ onNotify }) {
  return (
    <section className="admin-table-panel">
      <div className="admin-panel-header">
        <div>
          <h2>Reglas antifraude</h2>
          <p>El ADMIN puede editar pesos, umbrales y estado de las reglas.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => onNotify('Regla guardada', 'Configuración del motor antifraude actualizada.')} type="button">
          <SaveOutlined fontSize="small" />
          Guardar cambios
        </button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Regla</th>
              <th>Peso</th>
              <th>Umbral</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {RULES.map(({ code, name, weight, threshold, status, statusClass, action, actionClass, actionIcon: ActionIcon }) => (
              <tr key={code}>
                <td>{code}</td>
                <td>{name}</td>
                <td>{weight}</td>
                <td>{threshold}</td>
                <td><span className={`admin-badge ${statusClass}`}>{status}</span></td>
                <td>
                  <div className="admin-actions">
                    <button className="admin-mini-btn" type="button" onClick={() => onNotify('Regla en edición', `Se abrió ${code} para ajuste.`)}>
                      <EditOutlined fontSize="inherit" />
                      Editar
                    </button>
                    <button className={`admin-mini-btn ${actionClass}`} type="button" onClick={() => onNotify(`Regla ${action.toLowerCase()}`, `${code} fue marcada para ${action.toLowerCase()}.`)}>
                      <ActionIcon fontSize="inherit" />
                      {action}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}