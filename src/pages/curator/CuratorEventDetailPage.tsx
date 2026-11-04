import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEvents } from '../../contexts/EventsContext';
import Button from '../../components/ui/Button';
import { formatDateTime } from '../../utils/date';

export default function CuratorEventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, categories, updateEvent } = useEvents();
  const event = events.find((item) => item.id === id);
  const [reason, setReason] = useState('');
  const [showModal, setShowModal] = useState(false);

  if (!event) return <div className="text-center text-slate-600">Evento não encontrado.</div>;

  const categoryName = categories.find((category) => category.id === event.categoryId)?.name ?? 'Outros';

  const handleApprove = () => {
    updateEvent({
      ...event,
      status: 'approved',
      rejectionReason: undefined,
      updatedAt: new Date().toISOString(),
    });
    navigate('/curador/eventos');
  };

  const handleReject = () => {
    const cleanReason = reason.trim();
    if (!cleanReason) return;

    updateEvent({
      ...event,
      status: 'rejected',
      rejectionReason: cleanReason,
      updatedAt: new Date().toISOString(),
    });
    setShowModal(false);
    setReason('');
    navigate('/curador/eventos');
  };

  return (
    <div className="space-y-6">
      <Link to="/curador/eventos" className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">Voltar</Link>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
        <img src={event.images[0]} alt={event.title} className="h-72 w-full object-cover" />
        <div className="space-y-6 p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-brand-primary">{categoryName}</span>
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">{event.status}</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900">{event.title}</h1>
          <p className="text-slate-600">{event.description}</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4"><div className="text-sm text-slate-500">Data</div><div className="mt-2 font-semibold">{formatDateTime(event.startDateTime)} - {formatDateTime(event.endDateTime)}</div></div>
            <div className="rounded-2xl bg-slate-50 p-4"><div className="text-sm text-slate-500">Local</div><div className="mt-2 font-semibold">{event.venueName}</div></div>
            <div className="rounded-2xl bg-slate-50 p-4"><div className="text-sm text-slate-500">Endereço</div><div className="mt-2 font-semibold">{event.address}</div></div>
            <div className="rounded-2xl bg-slate-50 p-4"><div className="text-sm text-slate-500">Ingresso</div><div className="mt-2 font-semibold">{event.isFree ? 'Gratuito' : `R$ ${event.ticketPrice}`}</div></div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={handleApprove}>Aprovar</Button>
            <Button variant="danger" onClick={() => setShowModal(true)}>Reprovar</Button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6">
            <h2 className="text-2xl font-black text-slate-900">Reprovar evento</h2>
            <label className="mt-4 block text-sm font-medium text-slate-700">
              <span className="mb-2 block">Motivo da reprovação</span>
              <textarea value={reason} onChange={(event) => setReason(event.target.value)} rows={4} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" placeholder="Descreva o motivo..." />
            </label>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button variant="danger" onClick={handleReject} disabled={!reason.trim()}>Confirmar reprovação</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
