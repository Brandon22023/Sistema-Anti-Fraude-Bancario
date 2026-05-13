import { LogoutOutlined, RefreshOutlined, TaskAltOutlined } from '@mui/icons-material'

export function SupervisorTopbar({ label, title, description, onNotify, onLogout }) {
  return (
    <header className="supervisor-topbar">
      <div>
        <div className="supervisor-page-label">{label}</div>
        <h1 className="supervisor-page-title">{title}</h1>
        <p className="supervisor-page-copy">{description}</p>
      </div>

      <div className="supervisor-top-actions">
        <button className="supervisor-btn supervisor-btn-light" onClick={() => onNotify('Reporte listo', 'Se preparó el resumen ejecutivo demo.')} type="button">
          <RefreshOutlined fontSize="small" />
          Exportar reporte
        </button>
        <button className="supervisor-btn supervisor-btn-primary" onClick={() => onNotify('Validación registrada', 'Se validó una decisión crítica del analista.')} type="button">
          <TaskAltOutlined fontSize="small" />
          Validar caso
        </button>
        <button className="supervisor-btn supervisor-btn-light" onClick={onLogout} type="button">
          <LogoutOutlined fontSize="small" />
          Salir
        </button>
      </div>
    </header>
  )
}