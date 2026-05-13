import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { AdminSidebar } from './AdminSidebar'
import { AdminTopbar } from './AdminTopbar'

const SECTION_META = {
  dashboard: {
    label: 'Panel de administración',
    title: 'Vista general del sistema',
    description: 'Consola de monitoreo antifraude para usuarios internos con permisos administrativos.',
  },
  users: {
    label: 'Control de acceso',
    title: 'Usuarios y roles',
    description: 'Crear, editar, activar, desactivar y reasignar permisos dentro del sistema.',
  },
  rules: {
    label: 'Motor antifraude',
    title: 'Reglas configurables',
    description: 'Ajusta pesos, umbrales y estado del motor antifraude simulado.',
  },
  alerts: {
    label: 'Operación antifraude',
    title: 'Gestión de alertas',
    description: 'Revisa, asigna, resuelve o descarta alertas de riesgo alto y crítico.',
  },
  transactions: {
    label: 'Monitoreo transaccional',
    title: 'Transacciones simuladas',
    description: 'Consulta el historial transaccional con riesgo, canal, estado y dispositivo.',
  },
  customers: {
    label: 'Clientes ficticios',
    title: 'Clientes y cuentas',
    description: 'Perfil de riesgo, cuentas y alertas relacionadas con cada cliente ficticio.',
  },
  audit: {
    label: 'Trazabilidad',
    title: 'Auditoría administrativa',
    description: 'Registro de acciones relevantes realizadas por el usuario administrador.',
  },
  settings: {
    label: 'Configuración',
    title: 'Parámetros del sistema',
    description: 'Ajustes globales de la consola, modo demo y parámetros operativos.',
  },
}

function getSectionKey(pathname) {
  const parts = pathname.split('/').filter(Boolean)
  return parts[1] || 'dashboard'
}

export function AdminShell() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [toast, setToast] = useState(null)
  const toastTimerRef = useRef(null)
  const toastIdRef = useRef(0)

  const activeSection = getSectionKey(location.pathname)
  const meta = SECTION_META[activeSection] ?? SECTION_META.dashboard

  const notify = (title, text) => {
    toastIdRef.current += 1
    setToast({ title, text, id: toastIdRef.current })
    window.clearTimeout(toastTimerRef.current)
    toastTimerRef.current = window.setTimeout(() => setToast(null), 2800)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="admin-shell">
      <AdminSidebar activeSection={activeSection} user={user} />

      <main className="admin-main">
        <AdminTopbar
          description={meta.description}
          label={meta.label}
          onGenerateReport={() => notify('Reporte generado', 'Se preparó un resumen administrativo demo.')}
          onLogout={handleLogout}
          onSimulate={() => notify('Simulación iniciada', 'Se generaron nuevas transacciones simuladas.')}
          title={meta.title}
        />

        <AnimatePresence mode="wait">
          <motion.section
            key={activeSection}
            className="admin-section-transition"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <Outlet context={{ onNotify: notify, user }} />
          </motion.section>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {toast ? (
          <motion.div
            key={toast.id}
            className="admin-toast"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            <strong>{toast.title}</strong>
            <span>{toast.text}</span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}