import { useState, useEffect } from 'react'
import { Home, Palette, Save, Heart } from 'lucide-react'
import { AnimeNavBar } from '@/components/ui/anime-navbar'

function App() {
  const [palette, setPalette] = useState([])
  const [savedPalettes, setSavedPalettes] = useState([])
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'demo' : 'light')
  }

  useEffect(() => {
    fetchSavedPalettes()
    generatePalette()
  }, [])

  const fetchSavedPalettes = async () => {
    try {
      const response = await fetch('/api/palettes').then(res => res.json())
      setSavedPalettes(Array.isArray(response) ? response : (response.data || []))
    } catch (error) {
      console.error('Error:', error)
      setSavedPalettes([])
    }
  }

  const generatePalette = () => {
    const colors = Array(5).fill(0).map(() =>
      '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
    )
    setPalette(colors)
  }

  const savePalette = async () => {
    try {
      await fetch('/api/palettes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ colors: palette, name: `Palette ${savedPalettes.length + 1}` }) }).then(res => res.json())
      fetchSavedPalettes()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const deletePalette = async (id) => {
    try {
      await fetch(`/api/palettes/${id}`, { method: 'DELETE' })
      fetchSavedPalettes()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const copyColor = (color) => {
    navigator.clipboard.writeText(color)
    alert(`Copied ${color} to clipboard!`)
  }

  const navItems = [
    { name: "Home", url: "#", icon: Home },
    { name: "Generate", url: "#", icon: Palette },
    { name: "Saved", url: "#", icon: Save },
    { name: "Feedback", url: "#", icon: Heart },
  ]

  return (
    <>
      <AnimeNavBar items={navItems} defaultActive="Generate" theme={theme} toggleTheme={toggleTheme} />
      <div className="container" style={{ paddingTop: '100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
        <h1 style={{ margin: 0 }}>🎨 Color Palette Generator</h1>
      </div>

      <div className="card">
        <h2>Current Palette</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          {palette.map((color, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center' }}>
              <div
                style={{
                  height: '150px',
                  backgroundColor: color,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: '2px solid #ddd'
                }}
                onClick={() => copyColor(color)}
              />
              <p style={{ margin: '10px 0', fontFamily: 'monospace', fontWeight: 'bold' }}>
                {color}
              </p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={generatePalette} style={{ flex: 1 }}>🔄 Generate New</button>
          <button onClick={savePalette} style={{ flex: 1, backgroundColor: 'var(--success-color)' }}>💾 Save Palette</button>
        </div>
      </div>

      {savedPalettes?.length > 0 && (
        <div className="card">
          <h2>Saved Palettes ({savedPalettes.length})</h2>
          {savedPalettes.map(p => (
            <div key={p.id} style={{ marginBottom: '15px', padding: '15px', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
              <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                {p.colors.map((color, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: '60px',
                      backgroundColor: color,
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                    onClick={() => copyColor(color)}
                  />
                ))}
              </div>
              <button onClick={() => deletePalette(p.id)} style={{ backgroundColor: 'var(--danger-color)', width: '100%' }}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      </div>
    </>
  )
}

export default App
