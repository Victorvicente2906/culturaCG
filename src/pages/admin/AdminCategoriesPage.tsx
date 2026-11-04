import { useMemo, useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { mockCategories } from '../../data/mockCategories';

export default function AdminCategoriesPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const categories = useMemo(() => {
    return JSON.parse(localStorage.getItem('agenda-cultural-cg-categories') ?? JSON.stringify(mockCategories));
  }, []);

  const handleCreate = () => {
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName || !trimmedDescription) return;

    const nextCategories = [
      ...categories,
      {
        id: `category-${Date.now()}`,
        name: trimmedName,
        description: trimmedDescription,
      },
    ];

    localStorage.setItem('agenda-cultural-cg-categories', JSON.stringify(nextCategories));
    setName('');
    setDescription('');
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">Administração</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Categorias</h1>
        </div>
        <Button onClick={() => setIsOpen(true)}>Nova categoria</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category: { id: string; name: string; description: string }) => (
          <div key={category.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">Categoria</p>
            <h3 className="mt-3 text-xl font-black text-slate-900">{category.name}</h3>
            <p className="mt-3 text-sm text-slate-600">{category.description}</p>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6">
            <h2 className="text-2xl font-black text-slate-900">Nova categoria</h2>
            <div className="mt-5 space-y-4">
              <Input label="Nome" value={name} onChange={setName} />
              <Input label="Descrição" value={description} onChange={setDescription} />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancelar</Button>
              <Button onClick={handleCreate}>Salvar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
