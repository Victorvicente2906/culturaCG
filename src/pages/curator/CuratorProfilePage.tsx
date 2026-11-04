import { useAuth } from '../../contexts/AuthContext';

export default function CuratorProfilePage() {
  const { user } = useAuth();

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">Perfil</p>
      <h1 className="mt-2 text-3xl font-black text-slate-900">Meu perfil</h1>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-5">
          <div className="text-sm text-slate-500">Nome</div>
          <div className="mt-2 text-lg font-bold text-slate-900">{user?.name}</div>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5">
          <div className="text-sm text-slate-500">E-mail</div>
          <div className="mt-2 text-lg font-bold text-slate-900">{user?.email}</div>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5">
          <div className="text-sm text-slate-500">Perfil</div>
          <div className="mt-2 text-lg font-bold text-slate-900">Curador</div>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5">
          <div className="text-sm text-slate-500">Status</div>
          <div className="mt-2 text-lg font-bold text-emerald-600">Ativo</div>
        </div>
      </div>
    </div>
  );
}
