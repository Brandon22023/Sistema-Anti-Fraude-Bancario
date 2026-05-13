import { CampaignOutlined, PersonOutlineOutlined, SettingsOutlined } from '@mui/icons-material'

const AUDIT_ITEMS = [
  { title: 'ADMIN cambió rol de usuario', text: 'viewer@sentinelpay.com pasó a VISOR inactivo.', status: 'Hoy', statusClass: 'admin-badge-info', icon: PersonOutlineOutlined },
  { title: 'ADMIN actualizó regla NEW_DEVICE', text: 'Peso modificado a 15 puntos.', status: 'Hoy', statusClass: 'admin-badge-info', icon: SettingsOutlined },
  { title: 'ADMIN asignó alerta crítica', text: 'ALT-1028 asignada a Ana López.', status: 'CRITICAL', statusClass: 'admin-badge-high', icon: CampaignOutlined },
]

export function AuditPanel() {
  return (
    <section className="admin-table-panel">
      <div className="admin-panel-header">
        <div>
          <h2>Auditoría del sistema</h2>
          <p>Registro de acciones administrativas relevantes.</p>
        </div>
      </div>

      <div className="admin-panel-body">
        <div className="admin-activity-list">
          {AUDIT_ITEMS.map(({ title, text, status, statusClass, icon: Icon }) => (
            <div key={title} className="admin-activity">
              <div className="admin-activity-icon">
                <Icon fontSize="small" />
              </div>
              <div>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
              <span className={`admin-badge ${statusClass}`}>{status}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}