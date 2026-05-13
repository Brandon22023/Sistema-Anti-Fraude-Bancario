export function getRoleHomePath(role) {
  switch (role) {
    case 'ANALISTA':
      return '/analista/dashboard'
    case 'SUPERVISOR':
      return '/supervisdor/dashoboard'
    case 'VISOR':
      return '/visor/dashoboard'
    case 'ADMIN':
      return '/dashboard'
    default:
      return '/dashboard'
  }
}
