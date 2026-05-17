import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { getRoleHomePath } from '../routes/routePaths'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'

function Login() {
  const navigate = useNavigate()
  const { login, loading } = useAuth()
  const timerRef = useRef(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberDevice, setRememberDevice] = useState(true)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    return () => {
      window.clearTimeout(timerRef.current)
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage(null)

    try {
      const session = await login(email, password, rememberDevice)
      setMessage({
        type: 'success',
        text: `Acceso concedido como ${session.role}. Sesión iniciada correctamente.`,
      })
      timerRef.current = window.setTimeout(() => {
        navigate(getRoleHomePath(session.role))
      }, 900)
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message,
      })
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
            Ingresa con sus credenciales para acceder al dashboard de monitoreo antifraude.
          </p>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <div className="field-row">
                <label htmlFor="email">Correo </label>
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

            <button className={`submit-btn ${loading ? 'loading' : ''}`} disabled={loading} type="submit">
              {loading ? 'Validando acceso...' : 'Entrar al dashboard'}
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
