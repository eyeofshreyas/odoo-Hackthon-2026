function App() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#004ac6', marginBottom: '0.5rem' }}>
          TransitOps
        </h1>
        <p style={{ color: '#434655', fontSize: '1rem' }}>
          Smart Transport Operations Platform — Frontend ready ✅
        </p>
        <p style={{ color: '#737686', fontSize: '0.875rem', marginTop: '0.5rem' }}>
          API: {import.meta.env.VITE_API_BASE_URL}
        </p>
      </div>
    </div>
  )
}

export default App
