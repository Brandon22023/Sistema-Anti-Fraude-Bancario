import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const roleOptions = [
  { label: 'ADMIN', email: 'admin@sentinelpay.com', role: 'ADMIN' },
  { label: 'ANALISTA', email: 'analyst@sentinelpay.com', role: 'ANALISTA' },
  { label: 'SUPERV.', email: 'supervisor@sentinelpay.com', role: 'SUPERVISOR' },
  { label: 'VISOR', email: 'viewer@sentinelpay.com', role: 'VISOR' },
]

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

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
      // Redirigir al dashboard después de 1 segundo
      setTimeout(() => {
        navigate('/dashboard')
      }, 1000)
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message,
      })
      setIsLoading(false)
    }
  }

  return (
    <main className="login-wrapper">
      <section className="brand" aria-label="SentinelPay">
        <div className="brand-mark">S</div>
        <div className="brand-text">
          <strong>SentinelPay</strong>
          <span>Monitoreo antifraude interno</span>
        </div>
      </section>

      <section className="login-card">
        <div className="card-top">
          <div className="secure-pill">
            <span className="secure-dot"></span>
            Monitoreo activo
          </div>
          <h1>Iniciar sesión</h1>
          <p>
            Acceso exclusivo para usuarios internos del sistema de monitoreo
            antifraude.
          </p>
        </div>

        <div className="card-body">
          <div className="role-selector" aria-label="Selector de rol demo">
            {roleOptions.map((roleOption) => (
              <button
                className={`role-btn ${
                  selectedRole.role === roleOption.role ? 'active' : ''
                }`}
                key={roleOption.role}
                onClick={() => handleRoleSelect(roleOption)}
                type="button"
              >
                {roleOption.label}
              </button>
            ))}
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
                  {showPassword ? 'Ocultar' : 'Ver'}
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
              <a className="support-link" href="/login">
                Ayuda de acceso
              </a>
            </div>

            <button
              className={`submit-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? 'Validando acceso...' : 'Entrar al dashboard'}
            </button>

            {message && (
              <div className={`message show ${message.type}`}>
                {message.text}
              </div>
            )}
          </form>
        </div>
      </section>

    </main>
  )
}

export default Login
