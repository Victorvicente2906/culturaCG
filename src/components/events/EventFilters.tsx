import { CalendarRange, Search, SlidersHorizontal } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

export interface EventFiltersState {
  search: string;
  categoryId: string;
  date: string;
}

export default function EventFilters({
  filters,
  onFilterChange,
  onClear,
  categories,
}: {
  filters: EventFiltersState;
  onFilterChange: (next: EventFiltersState) => void;
  onClear: () => void;
  categories: Array<{ id: string; name: string }>;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-4 flex items-center gap-2 text-brand-primary">
        <SlidersHorizontal className="h-5 w-5" />
        <h3 className="text-lg font-bold text-slate-900">Filtrar agenda</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-[1.5fr_1fr_1fr_auto]">
        <Input
          value={filters.search}
          placeholder="Buscar evento"
          onChange={(value) => onFilterChange({ ...filters, search: value })}
          className="pl-4"
        />

        <Select
          value={filters.categoryId}
          onChange={(value) => onFilterChange({ ...filters, categoryId: value })}
          options={[{ label: 'Todas as categorias', value: '' }, ...categories.map((category) => ({ label: category.name, value: category.id }))]}
        />

        <div className="relative">
          <CalendarRange className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
          <input
            type="date"
            value={filters.date}
            onChange={(event) => onFilterChange({ ...filters, date: event.target.value })}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-10 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          />
        </div>

        <Button variant="ghost" onClick={onClear}>Limpar</Button>
      </div>
    </div>
  );
}
