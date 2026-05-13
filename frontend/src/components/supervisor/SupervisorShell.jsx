import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { SupervisorSidebar } from './SupervisorSidebar'
import { SupervisorTopbar } from './SupervisorTopbar'

const SUPERVISOR_META = {
  dashoboard: {
    label: 'Panel de supervisor',
    title: 'Resumen ejecutivo antifraude',
    description: 'Seguimiento operativo, validación de casos críticos, reportes y auditoría básica.',
  },
  critical: {
    label: 'Seguimiento prioritario',
    title: 'Alertas críticas',
    description: 'Casos HIGH y CRITICAL que necesitan atención supervisora.',
  },
  validations: {
    label: 'Control operativo',
    title: 'Validación de decisiones',
    description: 'Revisión de decisiones tomadas por el equipo analista.',
  },
  analysts: {
    label: 'Rendimiento',
    title: 'Analistas',
    description: 'Productividad, carga y calidad de revisión de analistas.',
  },
  transactions: {
    label: 'Consulta supervisora',
    title: 'Transacciones supervisadas',
    description: 'Consulta de transacciones para revisión gerencial y operativa.',
  },
  reports: {
    label: 'Reportería',
    title: 'Reportes ejecutivos',
    description: 'Resumen de supervisión y operación antifraude.',
  },
  audit: {
    label: 'Trazabilidad',
    title: 'Auditoría básica',
    description: 'Visión de trazabilidad operativa sin cambiar la configuración técnica.',
  },
}

function getPanelKey(pathname) {
  const parts = pathname.split('/').filter(Boolean)
  return parts[1] || 'dashoboard'
}

export function SupervisorShell() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [toast, setToast] = useState(null)
  const toastTimerRef = useRef(null)
  const toastIdRef = useRef(0)

  const panelKey = getPanelKey(location.pathname)
  const meta = SUPERVISOR_META[panelKey] ?? SUPERVISOR_META.dashoboard

  const handleNotify = (title, text) => {
    toastIdRef.current += 1
    setToast({ id: toastIdRef.current, title, text })
    window.clearTimeout(toastTimerRef.current)
    toastTimerRef.current = window.setTimeout(() => setToast(null), 2800)
  }

  const handleLogout = () => {
    logout()
    window.location.href = '/login'
  }

  return (
    <div className="supervisor-shell">
      <SupervisorSidebar user={user} />

      <main className="supervisor-main">
        <SupervisorTopbar
          label={meta.label}
          title={meta.title}
          description={meta.description}
          onNotify={handleNotify}
          onLogout={handleLogout}
        />

        <AnimatePresence mode="wait">
          <motion.section
            key={location.pathname}
            className="supervisor-section-transition"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <Outlet context={{ onNotify: handleNotify }} />
          </motion.section>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {toast ? (
          <motion.div
            key={toast.id}
            className="supervisor-toast"
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