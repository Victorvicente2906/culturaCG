import { useMemo } from 'react';
import { CalendarDays, CheckCircle2, Clock3, Users } from 'lucide-react';
import { mockEvents } from '../../data/mockEvents';
import { mockUsers } from '../../data/mockUsers';

const statCards = [
  { label: 'Eventos', key: 'events', icon: CalendarDays },
  { label: 'Aprovados', key: 'approved', icon: CheckCircle2 },
  { label: 'Pendentes', key: 'pending', icon: Clock3 },
  { label: 'Usuários', key: 'users', icon: Users },
] as const;

export default function AdminDashboardPage() {
  const data = useMemo(() => {
    const storedEvents = JSON.parse(localStorage.getItem('agenda-cultural-cg-events') ?? JSON.stringify(mockEvents));
    const storedUsers = JSON.parse(localStorage.getItem('agenda-cultural-cg-users') ?? JSON.stringify(mockUsers));

    return {
      events: storedEvents.length,
      approved: storedEvents.filter((event: { status: string }) => event.status === 'approved').length,
      pending: storedEvents.filter((event: { status: string }) => event.status === 'pending').length,
      users: storedUsers.length,
    };
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">Painel</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">Dashboard administrativo</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map(({ label, key, icon: Icon }) => (
          <div key={key} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">{label}</span>
              <div className="rounded-2xl bg-brand-primary/10 p-2 text-brand-primary">
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-6 text-3xl font-black text-slate-900">{data[key as keyof typeof data]}</div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-xl font-black text-slate-900">Resumo do mês</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Eventos aprovados</p>
            <p className="mt-2 text-2xl font-black text-slate-900">{data.approved}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Pendentes</p>
            <p className="mt-2 text-2xl font-black text-slate-900">{data.pending}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Usuários ativos</p>
            <p className="mt-2 text-2xl font-black text-slate-900">{data.users}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
