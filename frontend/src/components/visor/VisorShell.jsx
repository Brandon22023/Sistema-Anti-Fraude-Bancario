import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { VisorSidebar } from './VisorSidebar'
import { VisorTopbar } from './VisorTopbar'

const VISOR_META = {
  dashoboard: {
    label: 'Panel de visor',
    title: 'Dashboard de solo lectura',
    description: 'Acceso de solo lectura para consultar dashboard, transacciones, clientes y reportes.',
  },
  transactions: {
    label: 'Consulta transaccional',
    title: 'Transacciones',
    description: 'Consulta de transacciones simuladas en modo solo lectura.',
  },
  customers: {
    label: 'Consulta de clientes',
    title: 'Clientes ficticios',
    description: 'Consulta de clientes, cuentas y riesgo acumulado en modo lectura.',
  },
  reports: {
    label: 'Reportería',
    title: 'Reportes consultivos',
    description: 'El visor puede consultar reportes, no modificar ni aprobar decisiones.',
  },
  access: {
    label: 'Control de acceso',
    title: 'Permisos del VISOR',
    description: 'Resumen claro de lo permitido y bloqueado para este rol.',
  },
}

function getPanelKey(pathname) {
  const parts = pathname.split('/').filter(Boolean)
  return parts[1] || 'dashoboard'
}

export function VisorShell() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [toast, setToast] = useState(null)
  const toastTimerRef = useRef(null)
  const toastIdRef = useRef(0)

  const panelKey = getPanelKey(location.pathname)
  const meta = VISOR_META[panelKey] ?? VISOR_META.dashoboard

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
    <div className="visor-shell">
      <VisorSidebar user={user} />

      <main className="visor-main">
        <VisorTopbar
          label={meta.label}
          title={meta.title}
          description={meta.description}
          onNotify={handleNotify}
          onLogout={handleLogout}
        />

        <AnimatePresence mode="wait">
          <motion.section
            key={location.pathname}
            className="visor-section-transition"
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
            className="visor-toast"
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