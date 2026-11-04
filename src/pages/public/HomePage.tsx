import { ArrowRight, CalendarDays, ChevronRight, MapPin, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEvents } from '../../contexts/EventsContext';
import { EventItem } from '../../types';
import { formatDateTime, formatPrice, getEventStatusLabel, isEventVisible } from '../../utils/date';

const categories = [
  { id: 'show', label: 'Shows', icon: '🎵' },
  { id: 'fair', label: 'Feiras', icon: '🛍️' },
  { id: 'festival', label: 'Festivais', icon: '🎉' },
  { id: 'exhibition', label: 'Exposições', icon: '🎨' },
  { id: 'gastronomy', label: 'Gastronomia', icon: '🍽️' },
  { id: 'other', label: 'Outros', icon: '✨' },
];

export default function HomePage() {
  const { events, categories: categoriesOptions } = useEvents();

  const weeklyEvents = events.filter((event) => {
    const visible = isEventVisible(event);
    const start = new Date(event.startDateTime).getTime();
    const now = Date.now();
    const diff = start - now;
    return visible && diff <= 7 * 24 * 60 * 60 * 1000 && diff >= 0;
  }).slice(0, 6);

  return (
    <div className="pb-12">
      <section className="bg-gradient-to-br from-violet-50 to-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-20">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1.5 text-sm font-semibold text-brand-primary">
              <Sparkles className="h-4 w-4" /> Agenda cultural em destaque
            </div>

            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">A agenda cultural de Campo Grande</h1>
              <p className="max-w-xl text-lg text-slate-600">Shows, feiras, festivais, exposições e muito mais. Descubra tudo o que acontece na nossa cidade.</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <Search className="h-5 w-5 text-slate-400" />
                <input placeholder="Pesquisar eventos" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
              </div>
              <Link to="/agenda" className="inline-flex items-center justify-center rounded-2xl bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-800">Buscar</Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[32px] border border-violet-100 bg-white p-3 shadow-soft">
            <img
              src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"
              alt="Cultura de Campo Grande"
              className="h-full min-h-[380px] w-full rounded-[24px] object-cover"
            />
            <div className="absolute bottom-8 left-8 right-8 rounded-2xl bg-white/90 p-4 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">Próximos destaques</p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-slate-900">Festival Cultural do Cerrado</div>
                  <div className="mt-1 text-sm text-slate-600">05 a 07 nov • Parque das Nações Indígenas</div>
                </div>
                <Link to="/agenda" className="rounded-xl bg-violet-100 p-2 text-brand-primary"><ChevronRight className="h-5 w-5" /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-black text-slate-900">Categorias</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/agenda?category=${category.id}`}
              className="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-soft transition hover:-translate-y-1 hover:border-violet-200"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-2xl">{category.icon}</div>
              <div className="text-lg font-bold text-slate-900">{category.label}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-black text-slate-900">Eventos da semana</h2>
          <Link to="/agenda" className="text-sm font-semibold text-brand-primary">Ver agenda completa</Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {weeklyEvents.length > 0 ? weeklyEvents.map((event) => {
            const categoryName = categoriesOptions.find((category) => category.id === event.categoryId)?.name ?? 'Outros';
            return (
              <div key={event.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
                <img src={event.images[0]} alt={event.title} className="h-48 w-full object-cover" />
                <div className="space-y-3 p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-semibold text-brand-primary">{categoryName}</span>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">{getEventStatusLabel(event.status)}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{event.title}</h3>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-violet-600" />{formatDateTime(event.startDateTime)}</div>
                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-violet-600" />{event.venueName}</div>
                    <div className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-violet-600" />{event.isFree ? 'Gratuito' : formatPrice(event.ticketPrice)}</div>
                  </div>
                  <Link to={`/eventos/${event.id}`} className="inline-flex items-center rounded-xl bg-brand-primary px-4 py-2 text-sm font-semibold text-white">Detalhes</Link>
                </div>
              </div>
            );
          }) : <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">Nenhum evento desta semana foi encontrado.</div>}
        </div>
      </section>
    </div>
  );
}
