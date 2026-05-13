import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'

const roleOptions = [
  { label: 'ADMIN', email: 'admin@sentinelpay.com', role: 'ADMIN', icon: AdminPanelSettingsOutlinedIcon },
  { label: 'ANALISTA', email: 'analyst@sentinelpay.com', role: 'ANALISTA', icon: InsightsOutlinedIcon },
  { label: 'SUPERV.', email: 'supervisor@sentinelpay.com', role: 'SUPERVISOR', icon: BadgeOutlinedIcon },
  { label: 'VISOR', email: 'viewer@sentinelpay.com', role: 'VISOR', icon: VerifiedOutlinedIcon },
]

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const timerRef = useRef(null)

  const [selectedRole, setSelectedRole] = useState(roleOptions[0])
  const [email, setEmail] = useState(roleOptions[0].email)
  const [password, setPassword] = useState('admin123')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberDevice, setRememberDevice] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const handleRoleSelect = (roleOption) => {
    setSelectedRole(roleOption)
    setEmail(roleOption.email)
    setPassword('admin123')
  }

  useEffect(() => {
    return () => {
      window.clearTimeout(timerRef.current)
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      await login(email, password, rememberDevice)
      setMessage({
        type: 'success',
        text: `Acceso concedido como ${selectedRole.role}. Sesión demo iniciada correctamente.`,
      })
      timerRef.current = window.setTimeout(() => {
        navigate('/dashboard')
      }, 900)
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message,
      })
      setIsLoading(false)
    }
  }

  return (
    <main className="login-page">
      <motion.section
        className="login-card"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <div className="login-card-header">
          <div className="brand-stack login-brand-stack" aria-label="SentinelPay">
            <div className="brand-mark">S</div>
            <div className="brand-copy">
              <strong>SentinelPay</strong>
              <span>Monitoreo antifraude interno</span>
            </div>
          </div>

          <div className="secure-pill compact">
            <span className="secure-dot" />
            Acceso seguro
          </div>

          <h1>Iniciar sesión</h1>
          <p>
            Selecciona un rol demo y accede al sistema de monitoreo.
          </p>
        </div>

        <div className="card-body">
          <div className="role-selector" aria-label="Selector de rol demo">
            {roleOptions.map((roleOption) => {
              const RoleIcon = roleOption.icon

              return (
                <button
                  className={`role-btn ${selectedRole.role === roleOption.role ? 'active' : ''}`}
                  key={roleOption.role}
                  onClick={() => handleRoleSelect(roleOption)}
                  type="button"
                >
                  <RoleIcon fontSize="small" />
                  {roleOption.label}
                </button>
              )
            })}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <div className="field-row">
                <label htmlFor="email">Correo institucional</label>
                <span>{selectedRole.role}</span>
              </div>
              <div className="input-box">
                <input
                  id="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="usuario@sentinelpay.com"
                  required
                  type="email"
                  value={email}
                />
                <span className="input-icon">OK</span>
              </div>
            </div>

            <div className="field">
              <div className="field-row">
                <label htmlFor="password">Contraseña</label>
              </div>
              <div className="input-box">
                <input
                  id="password"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Ingresa tu contraseña"
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                />
                <button
                  className="toggle-password"
                  onClick={() => setShowPassword((current) => !current)}
                  type="button"
                >
                  {showPassword ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}
                </button>
              </div>
            </div>

            <div className="options">
              <label className="remember">
                <input
                  checked={rememberDevice}
                  onChange={(event) => setRememberDevice(event.target.checked)}
                  type="checkbox"
                />
                Recordar dispositivo
              </label>
              <button className="support-link" onClick={() => setMessage({ type: 'success', text: 'Contacto interno de soporte disponible en la intranet.' })} type="button">
                Ayuda de acceso
              </button>
            </div>

            <button className={`submit-btn ${isLoading ? 'loading' : ''}`} disabled={isLoading} type="submit">
              {isLoading ? 'Validando acceso...' : 'Entrar al dashboard'}
            </button>

            <AnimatePresence mode="wait">
              {message ? (
                <motion.div
                  key={message.type + message.text}
                  className={`message ${message.type}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                >
                  {message.text}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </form>
        </div>
      </motion.section>
    </main>
  )
}

export default Login
