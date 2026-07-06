import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

type Theme = 'light' | 'dark';
export type ThemeMode = 'light' | 'dark' | 'system' | 'schedule';

interface ThemeSettings {
  mode: ThemeMode;
  darkStart: string; // HH:MM
  darkEnd: string;   // HH:MM
}

interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  settings: ThemeSettings;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
  setMode: (m: ThemeMode) => void;
  updateSchedule: (darkStart: string, darkEnd: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'nv-theme-settings';

const defaultSettings: ThemeSettings = {
  mode: 'light',
  darkStart: '19:00',
  darkEnd: '07:00',
};

const loadSettings = (): ThemeSettings => {
  if (typeof window === 'undefined') return defaultSettings;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultSettings, ...JSON.parse(raw) };
    // Back-compat with old 'nv-theme'
    const legacy = localStorage.getItem('nv-theme');
    if (legacy === 'dark' || legacy === 'light') return { ...defaultSettings, mode: legacy };
  } catch {}
  return defaultSettings;
};

const isInDarkWindow = (start: string, end: string): boolean => {
  const now = new Date();
  const cur = now.getHours() * 60 + now.getMinutes();
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  const s = sh * 60 + sm;
  const e = eh * 60 + em;
  if (s === e) return false;
  return s < e ? cur >= s && cur < e : cur >= s || cur < e;
};

const computeTheme = (settings: ThemeSettings): Theme => {
  if (settings.mode === 'light') return 'light';
  if (settings.mode === 'dark') return 'dark';
  if (settings.mode === 'schedule') return isInDarkWindow(settings.darkStart, settings.darkEnd) ? 'dark' : 'light';
  // system
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<ThemeSettings>(loadSettings);
  const [theme, setThemeState] = useState<Theme>(() => computeTheme(loadSettings()));
  const tickRef = useRef<number | null>(null);

  // Apply theme to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, [theme]);

  // Persist + recompute when settings change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    setThemeState(computeTheme(settings));
  }, [settings]);

  // Listen to system changes
  useEffect(() => {
    if (settings.mode !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setThemeState(computeTheme(settings));
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [settings]);

  // Polling for schedule mode
  useEffect(() => {
    if (settings.mode !== 'schedule') return;
    const tick = () => setThemeState(computeTheme(settings));
    tick();
    tickRef.current = window.setInterval(tick, 60_000);
    return () => { if (tickRef.current) window.clearInterval(tickRef.current); };
  }, [settings]);

  const setTheme = (t: Theme) => setSettings((s) => ({ ...s, mode: t }));
  const setMode = (m: ThemeMode) => setSettings((s) => ({ ...s, mode: m }));
  const updateSchedule = (darkStart: string, darkEnd: string) =>
    setSettings((s) => ({ ...s, darkStart, darkEnd }));
  const toggleTheme = () => setSettings((s) => ({ ...s, mode: theme === 'dark' ? 'light' : 'dark' }));

  return (
    <ThemeContext.Provider value={{ theme, mode: settings.mode, settings, toggleTheme, setTheme, setMode, updateSchedule }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
