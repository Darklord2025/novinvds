import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById("root")!).render(<App />);


// Production registration only: Vite development modules must never be cached.
if ('serviceWorker' in navigator && (import.meta.env.PROD || new URLSearchParams(location.search).get('pwa') === '1')) {
  void navigator.serviceWorker.register('/sw.js').catch(() => { /* Site remains usable if installation is blocked. */ });
}
