import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import EventFilters, { EventFiltersState } from '../../components/events/EventFilters';
import EventGrid from '../../components/events/EventGrid';
import { useEvents } from '../../contexts/EventsContext';
import { EventItem } from '../../types';

const initialFilters: EventFiltersState = { search: '', categoryId: '', date: '' };

export default function AgendaPage() {
  const { events, categories } = useEvents();
  const [filters, setFilters] = useState<EventFiltersState>(initialFilters);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      if (event.status !== 'approved') return false;
      if (new Date(event.endDateTime).getTime() < Date.now()) return false;

      const matchesName = !filters.search || event.title.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = !filters.categoryId || event.categoryId === filters.categoryId;
      const matchesDate = !filters.date || new Date(event.startDateTime).toISOString().startsWith(new Date(filters.date).toISOString().slice(0, 10));

      return matchesName && matchesCategory && matchesDate;
    });
  }, [events, filters]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-primary">Agenda</p>
          <h1 className="mt-2 text-4xl font-black text-slate-900">Eventos em Campo Grande</h1>
        </div>
        <Link to="/" className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 md:inline-flex">Voltar</Link>
      </div>

      <div className="mb-8">
        <EventFilters filters={filters} categories={categories.filter((category) => category.active)} onFilterChange={setFilters} onClear={() => setFilters(initialFilters)} />
      </div>

      {filteredEvents.length > 0 ? (
        <EventGrid events={filteredEvents} categories={categories.filter((category) => category.active)} />
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="text-2xl font-bold text-slate-900">Nenhum evento encontrado</h2>
          <p className="mt-2 text-slate-600">Tente alterar os filtros ou voltar mais tarde.</p>
        </div>
      )}
    </div>
  );
}
