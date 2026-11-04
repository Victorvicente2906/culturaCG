export function formatDate(dateString: string) {
  if (!dateString) return 'Data não informada';
  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) return 'Data não informada';

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(parsed);
}

export function formatDateTime(dateString: string) {
  if (!dateString) return '—';
  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) return '—';

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(parsed);
}

export function getEventStatusLabel(status: string) {
  const map: Record<string, string> = {
    pending: 'Pendente',
    approved: 'Aprovado',
    rejected: 'Reprovado',
  };

  return map[status] ?? 'Pendente';
}

export function formatPrice(value?: number) {
  if (!value && value !== 0) return 'Gratuito';
  return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

export function isEventVisible(event: { status: string; endDateTime: string }) {
  return event.status === 'approved' && new Date(event.endDateTime).getTime() >= Date.now();
}

export function formatEventRange(start: string, end: string) {
  return `${formatDate(start)} • ${formatDate(end)}`;
}
