import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Login from '../pages/login'
import { Dashboard } from '../pages/dashboard'
import { Unauthorized } from '../pages/unauthorized'
import { AnalystShell } from '../components/analyst/AnalystShell'
import { AnalystDashboardPanel } from '../components/analyst/panels/DashboardPanel'
import { AnalystAlertsPanel } from '../components/analyst/panels/AlertsPanel'
import { AnalystTransactionsPanel } from '../components/analyst/panels/TransactionsPanel'
import { AnalystRiskDetailPanel } from '../components/analyst/panels/RiskDetailPanel'
import { AnalystCustomersPanel } from '../components/analyst/panels/CustomersPanel'
import { AnalystSimulatorPanel } from '../components/analyst/panels/SimulatorPanel'
import { AnalystReportsPanel } from '../components/analyst/panels/ReportsPanel'
import { SupervisorShell } from '../components/supervisor/SupervisorShell'
import { SupervisorDashboardPanel } from '../components/supervisor/panels/DashboardPanel'
import { SupervisorCriticalPanel } from '../components/supervisor/panels/CriticalPanel'
import { SupervisorValidationsPanel } from '../components/supervisor/panels/ValidationsPanel'
import { SupervisorAnalystsPanel } from '../components/supervisor/panels/AnalystsPanel'
import { SupervisorTransactionsPanel } from '../components/supervisor/panels/TransactionsPanel'
import { SupervisorReportsPanel } from '../components/supervisor/panels/ReportsPanel'
import { SupervisorAuditPanel } from '../components/supervisor/panels/AuditPanel'
import { ProtectedRoute } from './ProtectedRoute'
import { getRoleHomePath } from './routePaths'

function RoleHomeRedirect() {
  const { isAuthenticated, userRole } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Navigate to={getRoleHomePath(userRole)} replace />
}

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

      <Route
        path="/analista"
        element={
          <ProtectedRoute requiredRoles={['ANALISTA']}>
            <AnalystShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AnalystDashboardPanel />} />
        <Route path="dashoboard" element={<Navigate to="/analista/dashboard" replace />} />
        <Route path="alertas" element={<AnalystAlertsPanel />} />
        <Route path="transacciones" element={<AnalystTransactionsPanel />} />
        <Route path="detalle-riesgo" element={<AnalystRiskDetailPanel />} />
        <Route path="clientes" element={<AnalystCustomersPanel />} />
        <Route path="simulador" element={<AnalystSimulatorPanel />} />
        <Route path="reportes" element={<AnalystReportsPanel />} />
      </Route>

      <Route
        path="/supervisdor"
        element={
          <ProtectedRoute requiredRoles={['SUPERVISOR']}>
            <SupervisorShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashoboard" replace />} />
        <Route path="dashoboard" element={<SupervisorDashboardPanel />} />
        <Route path="dashboard" element={<Navigate to="/supervisdor/dashoboard" replace />} />
        <Route path="critical" element={<SupervisorCriticalPanel />} />
        <Route path="validations" element={<SupervisorValidationsPanel />} />
        <Route path="analysts" element={<SupervisorAnalystsPanel />} />
        <Route path="transactions" element={<SupervisorTransactionsPanel />} />
        <Route path="reports" element={<SupervisorReportsPanel />} />
        <Route path="audit" element={<SupervisorAuditPanel />} />
      </Route>

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

      {/* Redireccionar raíz según rol */}
      <Route path="/" element={<RoleHomeRedirect />} />

      {/* 404 */}
      <Route path="*" element={<RoleHomeRedirect />} />
    </Routes>
  )
}
