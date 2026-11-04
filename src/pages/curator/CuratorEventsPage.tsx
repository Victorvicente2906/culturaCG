import { Link } from 'react-router-dom';
import Badge from '../../components/ui/Badge';
import { useEvents } from '../../contexts/EventsContext';
import { EventItem } from '../../types';
import { formatDateTime } from '../../utils/date';

export default function CuratorEventsPage() {
  const { events, categories } = useEvents();
  const pendingEvents = events.filter((event) => event.status === 'pending');

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">Curadoria</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">Eventos pendentes</h1>
      </div>

      <div className="grid gap-5">
        {pendingEvents.length > 0 ? pendingEvents.map((event) => {
          const categoryName = categories.find((category) => category.id === event.categoryId)?.name ?? 'Outros';
          return (
            <div key={event.id} className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-soft md:grid-cols-[150px_1fr_auto] md:items-center">
              <img src={event.images[0]} alt={event.title} className="h-28 w-full rounded-2xl object-cover md:h-full" />
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-semibold text-brand-primary">{categoryName}</span>
                  <Badge tone="warning">Pendente</Badge>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{event.title}</h3>
                <p className="text-sm text-slate-600">{event.venueName} • {formatDateTime(event.startDateTime)}</p>
              </div>
              <Link to={`/curador/eventos/${event.id}`} className="inline-flex items-center justify-center rounded-xl bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white">Analisar</Link>
            </div>
          );
        }) : <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">Nenhum evento pendente.</div>}
      </div>
    </div>
  );
}
