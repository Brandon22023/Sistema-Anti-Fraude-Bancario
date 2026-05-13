export function getRoleHomePath(role) {
  switch (role) {
    case 'ANALISTA':
      return '/analista/dashboard'
    case 'SUPERVISOR':
      return '/supervisdor/dashoboard'
    case 'VISOR':
      return '/visor/dashoboard'
    case 'ADMIN':
      return '/admin/dashboard'
    default:
      return '/dashboard'
  }
}

export function getAdminSectionPath(section) {
  switch (section) {
    case 'dashboard':
    case 'users':
    case 'rules':
    case 'alerts':
    case 'transactions':
    case 'customers':
    case 'audit':
    case 'settings':
      return `/admin/${section}`
    default:
      return '/admin/dashboard'
  }
}
