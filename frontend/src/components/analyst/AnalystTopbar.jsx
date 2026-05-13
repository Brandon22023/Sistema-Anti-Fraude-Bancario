import {
  NotificationsActiveOutlined,
  RefreshOutlined,
  LogoutOutlined,
} from '@mui/icons-material'

export function AnalystTopbar({ label, title, description, onNotify, onLogout }) {
  return (
    <header className="analyst-topbar">
      <div>
        <div className="analyst-page-label">{label}</div>
        <h1 className="analyst-page-title">{title}</h1>
        <p className="analyst-page-copy">{description}</p>
      </div>

      <div className="analyst-top-actions">
        <button className="analyst-btn analyst-btn-light" onClick={() => onNotify('Vista actualizada', 'Se refrescaron las alertas y transacciones demo.')} type="button">
          <RefreshOutlined fontSize="small" />
          Actualizar
        </button>
        <button className="analyst-btn analyst-btn-primary" onClick={() => onNotify('Alerta recibida', 'Nueva alerta HIGH enviada al panel del analista.')} type="button">
          <NotificationsActiveOutlined fontSize="small" />
          Simular alerta live
        </button>
        <button className="analyst-btn analyst-btn-light" onClick={onLogout} type="button">
          <LogoutOutlined fontSize="small" />
          Salir
        </button>
      </div>
    </header>
  )
}