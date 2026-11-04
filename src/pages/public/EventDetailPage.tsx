import { ArrowLeft, CalendarDays, Clock3, MapPin, Ticket, ChevronRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useEvents } from '../../contexts/EventsContext';
import { formatDateTime, formatPrice, getEventStatusLabel } from '../../utils/date';

export default function EventDetailPage() {
  const { id } = useParams();
  const { events, categories } = useEvents();
  const event = events.find((item) => item.id === id);

  if (!event) {
    return <div className="mx-auto max-w-5xl px-4 py-16 text-center text-slate-600">Evento não encontrado.</div>;
  }

  const categoryName = categories.find((category) => category.id === event.categoryId)?.name ?? 'Outros';

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/agenda" className="mb-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Link>

      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-soft">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <img src={event.images[0]} alt={event.title} className="h-[420px] w-full object-cover" />
            <div className="grid grid-cols-3 gap-3 p-4">
              {event.images.slice(0, 3).map((image, index) => (
                <img key={image + index} src={image} alt={`${event.title} ${index + 1}`} className="h-28 w-full rounded-2xl object-cover" />
              ))}
            </div>
          </div>

          <div className="space-y-5 p-6 lg:p-8">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-brand-primary">{categoryName}</span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">{getEventStatusLabel(event.status)}</span>
            </div>

            <h1 className="text-3xl font-black text-slate-900 lg:text-4xl">{event.title}</h1>
            <p className="text-base leading-7 text-slate-600">{event.description}</p>

            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex items-center gap-3"><CalendarDays className="h-4 w-4 text-violet-600" />{formatDateTime(event.startDateTime)} a {formatDateTime(event.endDateTime)}</div>
              <div className="flex items-center gap-3"><Clock3 className="h-4 w-4 text-violet-600" />{new Date(event.startDateTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} às {new Date(event.endDateTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</div>
              <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-violet-600" />{event.venueName}</div>
              <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-violet-600" />{event.address}</div>
              <div className="flex items-center gap-3"><Ticket className="h-4 w-4 text-violet-600" />{event.isFree ? 'Gratuito' : formatPrice(event.ticketPrice)}</div>
            </div>

            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-4 py-3 text-sm font-semibold text-white hover:bg-orange-500">
              Ver no mapa <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
