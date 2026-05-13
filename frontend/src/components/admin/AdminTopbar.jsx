import { DownloadOutlined, FlashOnOutlined, LogoutOutlined } from '@mui/icons-material'

export function AdminTopbar({ label, title, description, onGenerateReport, onSimulate, onLogout }) {
  return (
    <header className="admin-topbar">
      <div>
        <div className="admin-page-label">{label}</div>
        <h1 className="admin-page-title">{title}</h1>
        <p className="admin-page-copy">{description}</p>
      </div>

      <div className="admin-top-actions">
        <button className="admin-btn admin-btn-light" onClick={onGenerateReport} type="button">
          <DownloadOutlined fontSize="small" />
          Generar reporte
        </button>
        <button className="admin-btn admin-btn-primary" onClick={onSimulate} type="button">
          <FlashOnOutlined fontSize="small" />
          Simular transacciones
        </button>
        <button className="admin-btn admin-btn-light" onClick={onLogout} type="button">
          <LogoutOutlined fontSize="small" />
          Salir
        </button>
      </div>
    </header>
  )
}