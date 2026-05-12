import { useNavigate } from 'react-router-dom'

export function Unauthorized() {
  const navigate = useNavigate()

  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>403 - Acceso Denegado</h1>
      <p>No tienes permisos para acceder a esta página.</p>
      <button onClick={() => navigate(-1)} style={{ padding: '0.5rem 1rem', cursor: 'pointer', marginTop: '1rem' }}>
        Volver atrás
      </button>
    </main>
  )
}
