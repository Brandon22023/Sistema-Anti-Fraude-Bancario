import { AddCircleOutlineOutlined, EditOutlined, ToggleOffOutlined, ToggleOnOutlined } from '@mui/icons-material'

const USERS = [
  { name: 'Brandon Admin', email: 'admin@sentinelpay.com', role: 'ADMIN', roleClass: 'admin-badge-danger', status: 'ACTIVO', statusClass: 'admin-badge-info', lastAccess: 'Hoy 09:40', action: 'Desactivar', actionClass: 'admin-mini-btn-danger', actionIcon: ToggleOffOutlined },
  { name: 'Ana López', email: 'analyst@sentinelpay.com', role: 'ANALISTA', roleClass: 'admin-badge-warning', status: 'ACTIVO', statusClass: 'admin-badge-info', lastAccess: 'Hoy 08:10', action: 'Desactivar', actionClass: 'admin-mini-btn-danger', actionIcon: ToggleOffOutlined },
  { name: 'Carlos Méndez', email: 'supervisor@sentinelpay.com', role: 'SUPERVISOR', roleClass: 'admin-badge-info', status: 'ACTIVO', statusClass: 'admin-badge-info', lastAccess: 'Ayer 17:22', action: 'Desactivar', actionClass: 'admin-mini-btn-danger', actionIcon: ToggleOffOutlined },
  { name: 'María Viewer', email: 'viewer@sentinelpay.com', role: 'VISOR', roleClass: 'admin-badge-success', status: 'INACTIVO', statusClass: 'admin-badge-disabled', lastAccess: 'Hace 3 días', action: 'Activar', actionClass: 'admin-mini-btn-success', actionIcon: ToggleOnOutlined },
]

export function UsersPanel({ onNotify }) {
  return (
    <section className="admin-table-panel">
      <div className="admin-panel-header">
        <div>
          <h2>Usuarios y roles</h2>
          <p>El ADMIN puede crear usuarios, cambiar roles y activar o desactivar accesos.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => onNotify('Usuario demo creado', 'Se agregó un nuevo usuario simulado.')} type="button">
          <AddCircleOutlineOutlined fontSize="small" />
          Nuevo usuario
        </button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Último acceso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {USERS.map(({ name, email, role, roleClass, status, statusClass, lastAccess, action, actionClass, actionIcon: ActionIcon }) => (
              <tr key={email}>
                <td>{name}</td>
                <td>{email}</td>
                <td><span className={`admin-badge ${roleClass}`}>{role}</span></td>
                <td><span className={`admin-badge ${statusClass}`}>{status}</span></td>
                <td>{lastAccess}</td>
                <td>
                  <div className="admin-actions">
                    <button className="admin-mini-btn" type="button" onClick={() => onNotify('Edición abierta', `Se abrió el formulario para ${name}.`)}>
                      <EditOutlined fontSize="inherit" />
                      Editar
                    </button>
                    <button className={`admin-mini-btn ${actionClass}`} type="button" onClick={() => onNotify(`Usuario ${action.toLowerCase()}`, `${name} fue marcado como ${action.toLowerCase()}.`)}>
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