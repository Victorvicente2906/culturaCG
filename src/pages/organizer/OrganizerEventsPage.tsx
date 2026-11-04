import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useEvents } from '../../contexts/EventsContext';
import Badge from '../../components/ui/Badge';
import { formatDateTime } from '../../utils/date';

const tabs = [
  { key: 'all', label: 'Todos' },
  { key: 'pending', label: 'Pendentes' },
  { key: 'approved', label: 'Aprovados' },
  { key: 'rejected', label: 'Reprovados' },
] as const;

export default function OrganizerEventsPage() {
  const { user } = useAuth();
  const { events, categories } = useEvents();
  const [filter, setFilter] = useState<(typeof tabs)[number]['key']>('all');

  const myEvents = events.filter((event) => event.organizerId === user?.id);
  const visibleEvents = filter === 'all' ? myEvents : myEvents.filter((event) => event.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">Organizador</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Meus eventos</h1>
        </div>
        <Link to="/organizador/eventos/novo" className="inline-flex items-center justify-center rounded-xl bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white">Cadastrar evento</Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${filter === tab.key ? 'bg-brand-primary text-white' : 'bg-white text-slate-600'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Evento</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Categoria</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Data</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Local</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Status</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {visibleEvents.map((event) => {
                const categoryName = categories.find((item) => item.id === event.categoryId)?.name ?? 'Outros';
                const statusTone = event.status === 'approved' ? 'success' : event.status === 'rejected' ? 'danger' : 'warning';

                return (
                  <tr key={event.id} className="border-t border-slate-200">
                    <td className="px-4 py-4 font-semibold text-slate-800">{event.title}</td>
                    <td className="px-4 py-4 text-slate-600">{categoryName}</td>
                    <td className="px-4 py-4 text-slate-600">{formatDateTime(event.startDateTime)}</td>
                    <td className="px-4 py-4 text-slate-600">{event.venueName}</td>
                    <td className="px-4 py-4"><Badge tone={statusTone}>{event.status === 'approved' ? 'Aprovado' : event.status === 'rejected' ? 'Reprovado' : 'Pendente'}</Badge></td>
                    <td className="px-4 py-4">
                      {event.status === 'rejected' ? (
                        <div className="space-y-1">
                          <Link to={`/organizador/eventos/${event.id}/editar`} className="block text-sm font-semibold text-brand-primary">Editar e reenviar</Link>
                          {event.rejectionReason && <span className="block text-xs text-red-600">Motivo: {event.rejectionReason}</span>}
                        </div>
                      ) : event.status === 'approved' ? (
                        <span className="text-sm text-emerald-600">Aprovado</span>
                      ) : (
                        <span className="text-sm text-yellow-600">Em análise</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
