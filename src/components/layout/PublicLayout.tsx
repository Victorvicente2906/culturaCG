import { Outlet, Link, NavLink } from 'react-router-dom';
import { CalendarDays, MapPin, Menu, Sparkles, Ticket, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-brand-primary shadow-soft">
        <CalendarDays className="h-5 w-5" />
      </div>
      <div>
        <div className="text-lg font-black tracking-tight text-slate-900">Agenda Cultural CG</div>
      </div>
    </Link>
  );
}

export default function PublicLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();

  const navItems = [
    { to: '/', label: 'Início' },
    { to: '/agenda', label: 'Agenda' },
    { to: '#sobre', label: 'Sobre' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Brand />

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${isActive ? 'text-brand-primary' : 'text-slate-600 hover:text-slate-900'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link to={user ? (user.role === 'admin' ? '/admin/dashboard' : user.role === 'curator' ? '/curador/eventos' : '/organizador/eventos') : '/login'} className="inline-flex items-center rounded-xl border border-violet-200 bg-violet-50 px-4 py-2.5 text-sm font-semibold text-brand-primary transition hover:bg-violet-100">
              {user ? 'Painel' : 'Entrar'}
            </Link>
          </div>

          <button className="rounded-xl border border-slate-200 p-2 md:hidden" onClick={() => setMobileOpen((value) => !value)} aria-label="Abrir menu">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-brand-primary' : 'text-slate-600'}`}
                >
                  {item.label}
                </NavLink>
              ))}
              <Link to={user ? (user.role === 'admin' ? '/admin/dashboard' : user.role === 'curator' ? '/curador/eventos' : '/organizador/eventos') : '/login'} className="mt-2 inline-flex items-center justify-center rounded-xl bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white" onClick={() => setMobileOpen(false)}>
                {user ? 'Painel' : 'Entrar'}
              </Link>
            </div>
          </div>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      <footer id="sobre" className="bg-slate-900 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div className="space-y-4">
            <Brand />
            <p className="text-sm text-slate-300">Uma vitrine cultural que conecta pessoas, artistas e produtores em Campo Grande, Mato Grosso do Sul.</p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-violet-200">Navegação</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link to="/">Início</Link></li>
              <li><Link to="/agenda">Agenda</Link></li>
              <li><Link to="/login">Entrar</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-violet-200">Localização</h3>
            <div className="flex items-start gap-2 text-sm text-slate-300">
              <MapPin className="mt-0.5 h-4 w-4 text-brand-secondary" />
              <span>Campo Grande/MS</span>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-violet-200">Plataforma</h3>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Sparkles className="h-4 w-4 text-brand-secondary" />
              <span>Agenda Cultural CG</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-slate-300">
              <Ticket className="h-4 w-4 text-brand-secondary" />
              <span>UC20 — Metodologias Ágeis</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
