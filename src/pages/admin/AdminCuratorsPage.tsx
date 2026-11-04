import { useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { mockUsers } from '../../data/mockUsers';

export default function AdminCuratorsPage() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const savedUsers = JSON.parse(localStorage.getItem('agenda-cultural-cg-users') ?? JSON.stringify(mockUsers)) as typeof mockUsers;
  const curators = savedUsers.filter((user) => user.role === 'curator');

  const handleCreate = () => {
    if (!name.trim() || !email.trim() || !password.trim()) return;

    const nextUsers = [
      ...savedUsers,
      {
        id: `curator-${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        role: 'curator' as const,
        active: true,
      },
    ];

    localStorage.setItem('agenda-cultural-cg-users', JSON.stringify(nextUsers));
    setName('');
    setEmail('');
    setPassword('');
    setShowModal(false);
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">Administração</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Curadores</h1>
        </div>
        <Button onClick={() => setShowModal(true)}>Novo Curador</Button>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
        <table className="min-w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Nome</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">E-mail</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Status</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            {curators.map((curator) => (
              <tr key={curator.id} className="border-t border-slate-200">
                <td className="px-4 py-3 font-semibold text-slate-800">{curator.name}</td>
                <td className="px-4 py-3 text-slate-600">{curator.email}</td>
                <td className="px-4 py-3"><span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">Ativo</span></td>
                <td className="px-4 py-3 text-sm font-semibold text-brand-primary">Editar</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6">
            <h2 className="text-2xl font-black text-slate-900">Novo curador</h2>
            <div className="mt-5 space-y-4">
              <Input label="Nome" value={name} onChange={setName} />
              <Input label="E-mail" value={email} onChange={setEmail} />
              <Input label="Senha inicial" type="password" value={password} onChange={setPassword} />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button onClick={handleCreate}>Salvar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
