import { ArrowRight, Calendar, Clock3, MapPin, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EventItem } from '../../types';
import { formatDateTime, formatPrice, getEventStatusLabel } from '../../utils/date';

export default function EventCard({ event, categoryName }: { event: EventItem; categoryName: string }) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1">
      <div className="relative h-52 overflow-hidden">
        <img src={event.images[0]} alt={event.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-700">{categoryName}</span>
          <span className="rounded-full bg-brand-primary px-2.5 py-1 text-xs font-semibold text-white">{getEventStatusLabel(event.status)}</span>
        </div>
      </div>

      <div className="space-y-3 p-5">
        <h3 className="text-xl font-bold text-slate-900">{event.title}</h3>

        <div className="space-y-2 text-sm text-slate-600">
          <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-violet-600" />{formatDateTime(event.startDateTime)}</div>
          <div className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-violet-600" />{new Date(event.startDateTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</div>
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-violet-600" />{event.venueName}</div>
          <div className="flex items-center gap-2"><Ticket className="h-4 w-4 text-violet-600" />{event.isFree ? 'Gratuito' : formatPrice(event.ticketPrice)}</div>
        </div>

        <Link to={`/eventos/${event.id}`} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-800">
          Ver detalhes <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
