import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { AnalystSidebar } from './AnalystSidebar'
import { AnalystTopbar } from './AnalystTopbar'

const ANALYST_META = {
  dashboard: {
    label: 'Panel de analista',
    title: 'Alertas y riesgo operativo',
    description: 'Vista general del trabajo del analista: alertas, cola prioritaria y simulación.',
  },
  alertas: {
    label: 'Bandeja operativa',
    title: 'Mis alertas',
    description: 'Alertas asignadas, estados, riesgo y acciones de revisión.',
  },
  transacciones: {
    label: 'Monitoreo',
    title: 'Transacciones',
    description: 'Consulta de transacciones simuladas y resultados de riesgo.',
  },
  'detalle-riesgo': {
    label: 'Análisis antifraude',
    title: 'Detalle de riesgo',
    description: 'Resumen del caso y reglas que dispararon la alerta.',
  },
  clientes: {
    label: 'Consulta de clientes',
    title: 'Clientes',
    description: 'Clientes ficticios, cuentas, alertas e historial.',
  },
  simulador: {
    label: 'Pruebas operativas',
    title: 'Simulador de transacción',
    description: 'Genera una transacción demo para validar el flujo antifraude.',
  },
  reportes: {
    label: 'Seguimiento',
    title: 'Reportes operativos',
    description: 'Resumen del trabajo del analista y casos revisados.',
  },
}

function getPanelKey(pathname) {
  const parts = pathname.split('/').filter(Boolean)
  return parts[1] || 'dashboard'
}

export function AnalystShell() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [toast, setToast] = useState(null)
  const toastTimerRef = useRef(null)
  const toastIdRef = useRef(0)

  const panelKey = getPanelKey(location.pathname)
  const meta = ANALYST_META[panelKey] ?? ANALYST_META.dashboard

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

  const shellContext = { onNotify: handleNotify }

  return (
    <div className="analyst-shell">
      <AnalystSidebar user={user} />

      <main className="analyst-main">
        <AnalystTopbar
          label={meta.label}
          title={meta.title}
          description={meta.description}
          onNotify={handleNotify}
          onLogout={handleLogout}
        />

        <AnimatePresence mode="wait">
          <motion.section
            key={location.pathname}
            className="analyst-section-transition"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <Outlet context={shellContext} />
          </motion.section>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {toast ? (
          <motion.div
            key={toast.id}
            className="analyst-toast"
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