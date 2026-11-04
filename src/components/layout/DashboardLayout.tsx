import { BarChart3, CalendarDays, ClipboardCheck, LayoutGrid, LogOut, Menu, Shield, UserCircle2, X } from 'lucide-react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const sidebarMap = {
  admin: [
    { to: '/admin/dashboard', label: 'Dashboard', icon: BarChart3 },
    { to: '/admin/eventos', label: 'Eventos', icon: CalendarDays },
    { to: '/admin/curadores', label: 'Curadores', icon: Shield },
    { to: '/admin/categorias', label: 'Categorias', icon: LayoutGrid },
  ],
  curator: [
    { to: '/curador/eventos', label: 'Eventos pendentes', icon: ClipboardCheck },
    { to: '/curador/perfil', label: 'Meu perfil', icon: UserCircle2 },
  ],
  organizer: [
    { to: '/organizador/eventos', label: 'Meus eventos', icon: CalendarDays },
    { to: '/organizador/eventos/novo', label: 'Cadastrar evento', icon: LayoutGrid },
    { to: '/organizador/perfil', label: 'Meu perfil', icon: UserCircle2 },
  ],
};

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = user ? sidebarMap[user.role] : [];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <aside className={`${mobileOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white p-5 transition-transform md:static md:translate-x-0`}>
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-brand-primary">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Agenda Cultural CG</div>
                <div className="text-xs text-slate-500">{user?.role === 'admin' ? 'Admin' : user?.role === 'curator' ? 'Curador' : 'Organizador'}</div>
              </div>
            </div>
            <button className="rounded-lg border border-slate-200 p-2 md:hidden" onClick={() => setMobileOpen(false)}>
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="space-y-2">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${isActive || location.pathname === to ? 'bg-violet-50 text-brand-primary' : 'text-slate-600 hover:bg-slate-100'}`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}

            <button onClick={handleLogout} className="mt-6 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600">
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </nav>
        </aside>

        <div className="flex-1">
          <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
              <button className="rounded-xl border border-slate-200 p-2 md:hidden" onClick={() => setMobileOpen(true)}>
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-600">Painel</div>
                <h1 className="text-xl font-bold text-slate-900">{user?.name}</h1>
              </div>
              <Link to="/" className="hidden rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 md:inline-flex">Voltar ao site</Link>
            </div>
          </header>

          <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
