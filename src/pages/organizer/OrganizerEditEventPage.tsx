import { FormEvent, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';
import { useAuth } from '../../contexts/AuthContext';
import { useEvents } from '../../contexts/EventsContext';
import { EventFormValues } from '../../types';

export default function OrganizerEditEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { events, categories, updateEvent } = useEvents();
  const event = events.find((item) => item.id === id && item.organizerId === user?.id);

  const initialForm = useMemo<EventFormValues | null>(() => {
    if (!event) return null;
    return {
      title: event.title,
      description: event.description,
      categoryId: event.categoryId,
      startDateTime: new Date(event.startDateTime).toISOString().slice(0, 16),
      endDateTime: new Date(event.endDateTime).toISOString().slice(0, 16),
      venueName: event.venueName,
      address: event.address,
      images: event.images,
      isFree: event.isFree,
      ticketPrice: String(event.ticketPrice ?? 0),
    };
  }, [event]);

  const [form, setForm] = useState<EventFormValues>(initialForm ?? {
    title: '',
    description: '',
    categoryId: '',
    startDateTime: '',
    endDateTime: '',
    venueName: '',
    address: '',
    images: [''],
    isFree: true,
    ticketPrice: '0',
  });

  const [error, setError] = useState('');

  if (!event || !initialForm) return <div className="text-center text-slate-600">Evento não encontrado.</div>;

  const handleSubmit = (eventForm: FormEvent) => {
    eventForm.preventDefault();

    if (!form.title.trim() || !form.description.trim() || !form.categoryId || !form.startDateTime || !form.endDateTime || !form.venueName.trim() || !form.address.trim() || !form.images[0]?.trim()) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }

    if (new Date(form.endDateTime).getTime() < new Date(form.startDateTime).getTime()) {
      setError('A data de término não pode ser anterior à data de início.');
      return;
    }

    if (!form.isFree && (!form.ticketPrice || Number(form.ticketPrice) <= 0)) {
      setError('Informe o valor do ingresso quando o evento for pago.');
      return;
    }

    const updated = {
      ...event,
      title: form.title.trim(),
      description: form.description.trim(),
      categoryId: form.categoryId,
      startDateTime: new Date(form.startDateTime).toISOString(),
      endDateTime: new Date(form.endDateTime).toISOString(),
      venueName: form.venueName.trim(),
      address: form.address.trim(),
      images: form.images.filter(Boolean),
      isFree: form.isFree,
      ticketPrice: form.isFree ? 0 : Number(form.ticketPrice || 0),
      status: 'pending' as const,
      rejectionReason: undefined,
      updatedAt: new Date().toISOString(),
    };

    updateEvent(updated);
    navigate('/organizador/eventos');
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">Organizador</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">Editar evento</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="grid gap-5 md:grid-cols-2">
          <Input label="Nome do evento" value={form.title} onChange={(value) => setForm({ ...form, title: value })} />
          <Select label="Categoria" value={form.categoryId} onChange={(value) => setForm({ ...form, categoryId: value })} options={[{ label: 'Selecione', value: '' }, ...categories.filter((category) => category.active).map((category) => ({ label: category.name, value: category.id }))]} />
        </div>

        <Textarea label="Descrição" value={form.description} onChange={(value) => setForm({ ...form, description: value })} />

        <div className="grid gap-5 md:grid-cols-2">
          <Input label="Data de início" type="datetime-local" value={form.startDateTime} onChange={(value) => setForm({ ...form, startDateTime: value })} />
          <Input label="Data de término" type="datetime-local" value={form.endDateTime} onChange={(value) => setForm({ ...form, endDateTime: value })} />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Input label="Nome do local" value={form.venueName} onChange={(value) => setForm({ ...form, venueName: value })} />
          <Input label="Endereço completo" value={form.address} onChange={(value) => setForm({ ...form, address: value })} />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Input label="URL da imagem" value={form.images[0] ?? ''} onChange={(value) => setForm({ ...form, images: [value] })} />
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                checked={form.isFree}
                onChange={(event) => setForm({ ...form, isFree: event.target.checked, ticketPrice: event.target.checked ? '0' : form.ticketPrice })}
              />
              Evento gratuito
            </label>
            {!form.isFree && (
              <div className="mt-3">
                <Input label="Valor do ingresso" type="number" value={form.ticketPrice ?? '0'} onChange={(value) => setForm({ ...form, ticketPrice: value })} />
              </div>
            )}
          </div>
        </div>

        {error && <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

        <div className="flex justify-end">
          <Button type="submit">Reenviar para análise</Button>
        </div>
      </form>
    </div>
  );
}
