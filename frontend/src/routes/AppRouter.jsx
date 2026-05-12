import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/login'
import { Dashboard } from '../pages/dashboard'
import { Unauthorized } from '../pages/unauthorized'
import { ProtectedRoute } from './ProtectedRoute'

export function AppRouter() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Rutas protegidas */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Rutas por rol - Ejemplo: solo ADMIN */}
      {/* 
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRoles={['ADMIN']}>
            <AdminPanel />
          </ProtectedRoute>
        }
      />
      */}

      {/* Redireccionar raíz a dashboard si está autenticado, sino a login */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
