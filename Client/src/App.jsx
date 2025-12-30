import { useState, useEffect } from 'react'
import { Hero } from '@/components/Hero'
import { Toolbar } from '@/components/Toolbar'
import { FeatureSection } from '@/components/FeatureSection'
import { BentoPreview } from '@/components/BentoPreview'
import { Button } from '@/components/ui/button'
import { Copy, Plus, Minus, Lock, Unlock } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Home, Palette, Save, Heart } from 'lucide-react'
import { AnimeNavBar } from '@/components/ui/anime-navbar.tsx'
import { FeedbackSection } from '@/components/FeedbackSection'

function App() {
  const [colors, setColors] = useState({
    text: '#000000',
    background: '#ffffff',
    primary: '#3b82f6',
    secondary: '#64748b',
    accent: '#8b5cf6'
  })
  const [savedPalettes, setSavedPalettes] = useState([])
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    const isNewThemeDark = newTheme === 'dark';

    // Helper to adjust lightness for contrast
    const adjustForContrast = (hexColor) => {
      const { h, s, l } = hexToHslValues(hexColor);
      let newL = l;

      if (isNewThemeDark) {
        // Dark Mode: Needs brighter colors (Pastel/Neon) -> Min Lightness 50%
        newL = Math.max(l, 50);
      } else {
        // Light Mode: Needs darker colors -> Max Lightness 60%
        newL = Math.min(l, 60);
      }
      return hslToHex(h, s, newL);
    };

    const newColors = {
      background: colors.text,
      text: colors.background,
      primary: adjustForContrast(colors.primary),
      secondary: adjustForContrast(colors.secondary),
      accent: adjustForContrast(colors.accent)
    };

    setColors(newColors);
    applyTheme(newColors);
  }

  useEffect(() => {
    fetchSavedPalettes()
    generateRandomPalette()
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

  // Helper to parse Hex to HSL values object
  const hexToHslValues = (hex) => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = "0x" + hex[1] + hex[1];
      g = "0x" + hex[2] + hex[2];
      b = "0x" + hex[3] + hex[3];
    } else if (hex.length === 7) {
      r = "0x" + hex[1] + hex[2];
      g = "0x" + hex[3] + hex[4];
      b = "0x" + hex[5] + hex[6];
    }
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    if (delta === 0) h = 0;
    else if (cmax === r) h = ((g - b) / delta) % 6;
    else if (cmax === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);
    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return { h, s, l };
  }

  // Helper to convert hex to HSL for CSS variables
  const hexToHsl = (hex) => {
    const { h, s, l } = hexToHslValues(hex);
    return `${h} ${s}% ${l}%`;
  }

  // HSL to Hex helper for generator
  const hslToHex = (h, s, l) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  const applyTheme = (newColors) => {
    const root = document.documentElement;

    // Update ALL colors for Realtime Colors effect
    root.style.setProperty('--background', hexToHsl(newColors.background));
    root.style.setProperty('--foreground', hexToHsl(newColors.text));
    root.style.setProperty('--primary', hexToHsl(newColors.primary));
    root.style.setProperty('--secondary', hexToHsl(newColors.secondary));
    root.style.setProperty('--accent', hexToHsl(newColors.accent));

    // Update card/popover to blend or contrast
    root.style.setProperty('--card', hexToHsl(newColors.background));
    root.style.setProperty('--card-foreground', hexToHsl(newColors.text));
    root.style.setProperty('--popover', hexToHsl(newColors.background));
    root.style.setProperty('--popover-foreground', hexToHsl(newColors.text));
  }

  const generateRandomPalette = () => {
    // Semantic generation logic
    const isDark = theme === 'dark';

    // Background: High lightness for light mode, low for dark
    const bgH = Math.floor(Math.random() * 360);
    const bgS = Math.floor(Math.random() * 20); // Low saturation for bg
    const bgL = isDark ? Math.floor(Math.random() * 15) + 5 : Math.floor(Math.random() * 10) + 90;

    // Text: Contrast to background
    const txtH = (bgH + 180) % 360;
    const txtS = Math.floor(Math.random() * 20);
    const txtL = isDark ? Math.floor(Math.random() * 10) + 90 : Math.floor(Math.random() * 15) + 5;

    // Primary: Vibrant
    const primH = Math.floor(Math.random() * 360);
    const primS = Math.floor(Math.random() * 40) + 60; // High saturation
    const primL = Math.floor(Math.random() * 40) + 30; // Medium lightness

    // Secondary: Complementary or Split
    const secH = (primH + 180) % 360;
    const secS = Math.floor(Math.random() * 30) + 40;
    const secL = Math.floor(Math.random() * 30) + 40;

    // Accent: Analogous or Triadic
    const accH = (primH + 30) % 360;
    const accS = Math.floor(Math.random() * 40) + 60;
    const accL = Math.floor(Math.random() * 30) + 50;

    const newColors = {
      text: hslToHex(txtH, txtS, txtL),
      background: hslToHex(bgH, bgS, bgL),
      primary: hslToHex(primH, primS, primL),
      secondary: hslToHex(secH, secS, secL),
      accent: hslToHex(accH, accS, accL),
    };
    setColors(newColors);
    applyTheme(newColors);
  }

  const handleColorChange = (key, value) => {
    const newColors = { ...colors, [key]: value };
    setColors(newColors);
    applyTheme(newColors);
  }

  const savePalette = async () => {
    try {
      await fetch('/api/palettes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ colors, name: `Palette ${savedPalettes.length + 1}` })
      }).then(res => res.json())
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

  // Helper to get array for display from either object or array (legacy support)
  const getPaletteArray = (paletteColors) => {
    if (Array.isArray(paletteColors)) return paletteColors;
    return [
      { key: 'text', value: paletteColors.text, name: 'Text' },
      { key: 'background', value: paletteColors.background, name: 'Background' },
      { key: 'primary', value: paletteColors.primary, name: 'Primary' },
      { key: 'secondary', value: paletteColors.secondary, name: 'Secondary' },
      { key: 'accent', value: paletteColors.accent, name: 'Accent' }
    ];
  }

  const currentPaletteArray = getPaletteArray(colors);

  const copyColor = (color) => {
    navigator.clipboard.writeText(color)
      .then(() => alert(`Copied ${color} to clipboard!`))
      .catch(err => console.error('Failed to copy:', err));
  };


  const navItems = [
    { name: "Home", url: "#", icon: Home },
    { name: "Generate", url: "#", icon: Palette },
    { name: "Saved", url: "#", icon: Save },
    { name: "Feedback", url: "#feedback", icon: Heart },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground pb-32 transition-colors duration-500">
      <AnimeNavBar items={navItems} defaultActive="Generate" theme={theme} toggleTheme={toggleTheme} />
      <Hero onGenerate={generateRandomPalette} />

      <FeatureSection />

      <div id="generator" className="container mx-auto px-4 py-8 min-h-screen flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Palette Generator</h2>

        <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[80vh] min-h-[600px]">
          {/* Left: Palette Sidebar */}
          <div className="w-full lg:w-1/4 flex flex-row lg:flex-col rounded-3xl overflow-hidden shadow-2xl border border-border shrink-0">
            {currentPaletteArray.map((colorObj, index) => (
              <div
                key={colorObj.key || index}
                className="group relative flex-1 flex flex-col items-center justify-center transition-all duration-300 hover:flex-[1.5]"
                style={{ backgroundColor: typeof colorObj === 'string' ? colorObj : colorObj.value }}
              >
                {/* Horizontal Layout (Mobile) / Vertical Layout (Desktop) content */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center gap-2 p-2">
                  <span className="text-white font-bold text-lg font-mono uppercase tracking-wider hidden lg:block">
                    {typeof colorObj === 'string' ? colorObj : colorObj.value}
                  </span>
                  <div className="flex gap-1">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 bg-white/20 hover:bg-white/40 text-white border-0"
                      onClick={() => copyColor(typeof colorObj === 'string' ? colorObj : colorObj.value)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 bg-white/20 hover:bg-white/40 text-white border-0"
                    >
                      <Unlock className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Bento Visualization */}
          <div className="flex-1 bg-card/30 rounded-3xl border border-border p-2 shadow-inner">
            <BentoPreview />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {savedPalettes?.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Saved Palettes ({savedPalettes.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedPalettes.map(p => (
                <div key={p.id} className="bg-card border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex h-16 rounded-md overflow-hidden mb-4 cursor-pointer" onClick={() => {
                    if (!Array.isArray(p.colors)) {
                      setColors(p.colors);
                    } else {
                      setColors({
                        text: p.colors[0],
                        background: p.colors[1],
                        primary: p.colors[2],
                        secondary: p.colors[3],
                        accent: p.colors[4],
                      })
                    }
                    document.getElementById('generator').scrollIntoView({ behavior: 'smooth' });
                  }}>
                    {(Array.isArray(p.colors) ? p.colors : [p.colors.text, p.colors.background, p.colors.primary, p.colors.secondary, p.colors.accent]).map((color, i) => (
                      <div
                        key={i}
                        className="flex-1 h-full"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePalette(p.id);
                    }}
                  >
                    Delete Palette
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <FeedbackSection />

      <Toolbar
        colors={colors}
        onGenerate={generateRandomPalette}
        onSave={savePalette}
        onColorChange={handleColorChange}
      />
    </div>
  )
}

export default App
