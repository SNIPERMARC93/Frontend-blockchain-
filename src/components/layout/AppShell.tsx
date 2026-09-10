import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useSession } from '@/hooks/useSession';

export function AppShell() {
  const { organisation } = useSession();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
    document.title = 'Nexus ID · ' + (location.pathname.split('/')[1] || 'Workspace');
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const sidebar = document.getElementById('workspace-navigation');
    const overflow = document.body.style.overflow;
    const focusable = () => Array.from(sidebar?.querySelectorAll<HTMLElement>('a[href], button:not(:disabled)') || []).filter(element => element.getClientRects().length);
    document.body.style.overflow = 'hidden';
    focusable()[0]?.focus();
    const close = () => setOpen(false);
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key !== 'Tab') return;
      const items = focusable(), first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', keydown);
    window.addEventListener('resize', close);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', keydown);
      window.removeEventListener('resize', close);
      if (previous?.isConnected) previous.focus();
    };
  }, [open]);

  return <div className="workspace">
    <a href="#page-content" className="skip-link">Skip to content</a>
    <Sidebar open={open} onClose={() => setOpen(false)} />
    <div className="workspace-main" inert={open}>
      <Header onMenu={() => setOpen(true)} menuOpen={open} />
      <main id="page-content" className="page-content"><Outlet /></main>
      <footer className="workspace-footer"><span>Nexus ID · {organisation?.name}</span><span>Frontend demo · Local data</span></footer>
    </div>
  </div>;
}
