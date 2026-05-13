export function getRoleHomePath(role) {
  switch (role) {
    case 'ANALISTA':
      return '/analista/dashboard'
    case 'ADMIN':
      return '/dashboard'
    default:
      return '/dashboard'
  }
}
