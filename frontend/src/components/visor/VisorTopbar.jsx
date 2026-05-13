import { BlockOutlined, RefreshOutlined } from '@mui/icons-material'

export function VisorTopbar({ label, title, description, onNotify, onLogout }) {
  return (
    <header className="visor-topbar">
      <div>
        <div className="visor-page-label">{label}</div>
        <h1 className="visor-page-title">{title}</h1>
        <p className="visor-page-copy">{description}</p>
      </div>

      <div className="visor-top-actions">
        <button className="visor-btn visor-btn-light" onClick={() => onNotify('Vista actualizada', 'Datos demo refrescados en modo lectura.')} type="button">
          <RefreshOutlined fontSize="small" />
          Actualizar vista
        </button>
        <button className="visor-btn visor-btn-disabled" onClick={() => onNotify('Acción no permitida', 'El rol VISOR no puede modificar datos.')} type="button">
          <BlockOutlined fontSize="small" />
          Acción bloqueada
        </button>
        <button className="visor-btn visor-btn-light" onClick={onLogout} type="button">
          Salir
        </button>
      </div>
    </header>
  )
}