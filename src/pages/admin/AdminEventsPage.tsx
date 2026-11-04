import { useEvents } from '../../contexts/EventsContext';
import Badge from '../../components/ui/Badge';

export default function AdminEventsPage() {
    const { events, categories } = useEvents();
    const statusLabels = {
        approved: 'Aprovado',
        rejected: 'Reprovado',
        pending: 'Pendente',
    };
    return (
        <div className="space-y-6">
            <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">Administração</p>
                <h1 className="mt-2 text-3xl font-black text-slate-900">Gerenciar eventos</h1>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Evento</th>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Categoria</th>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event) => {
                                const categoryName = categories.find((category) => category.id === event.categoryId)?.name ?? 'Outros';
                                const tone = event.status === 'approved' ? 'success' : event.status === 'rejected' ? 'danger' : 'warning';
                                return (
                                    <tr key={event.id} className="border-t border-slate-200">
                                        <td className="px-4 py-3 font-semibold text-slate-800">{event.title}</td>
                                        <td className="px-4 py-3 text-slate-600">{categoryName}</td>
                                        <td className="px-4 py-3"><Badge tone={tone}>
                                            {statusLabels[event.status]}
                                        </Badge></td>
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
