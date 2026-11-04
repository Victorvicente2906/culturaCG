import { FormEvent, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarDays, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [email, setEmail] = useState('admin@agendaculturalcg.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const redirectPath = useMemo(() => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin/dashboard';
    if (user.role === 'curator') return '/curador/eventos';
    return '/organizador/eventos';
  }, [user]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const result = login(email, password);
    if (!result.success) {
      setError(result.message ?? 'Erro no login.');
      return;
    }
    setError('');
    navigate(redirectPath);
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-140px)] max-w-5xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid w-full overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-soft lg:grid-cols-2">
        <div className="hidden bg-gradient-to-br from-violet-900 via-violet-700 to-brand-secondary p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <CalendarDays className="h-6 w-6" />
            </div>
            <div className="text-2xl font-black">Agenda Cultural CG</div>
          </div>
          <div>
            <h2 className="text-3xl font-black">Acesse seu painel</h2>
            <p className="mt-3 max-w-sm text-violet-100">Administre eventos, curadoria e organizadores em uma só plataforma.</p>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="mb-8 text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">Entrar</p>
            <h1 className="mt-3 text-3xl font-black text-slate-900">Bem-vindo(a)</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input label="E-mail" value={email} onChange={setEmail} placeholder="seu@email.com" />

            <div className="relative">
              <label className="block text-sm font-medium text-slate-700">
                <span className="mb-2 block">Senha</span>
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                  placeholder="••••••"
                />
              </label>
              <button type="button" className="absolute right-3 top-[42px] text-slate-500" onClick={() => setShowPassword((value) => !value)}>
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {error && <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

            <Button type="submit" className="w-full">Entrar</Button>

            <div className="text-center text-sm text-slate-600">
              Não tem conta como organizador?{' '}
              <Link to="/cadastro" className="font-semibold text-brand-primary">Cadastre-se</Link>
            </div>

            <div className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-800">Credenciais fictícias</p>
              <p>Admin: admin@agendaculturalcg.com / 123456</p>
              <p>Curador: curador@agendaculturalcg.com / 123456</p>
              <p>Organizador: organizador@agendaculturalcg.com / 123456</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
