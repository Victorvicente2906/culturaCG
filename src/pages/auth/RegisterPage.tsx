import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../contexts/AuthContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { registerOrganizer } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (form.password !== form.confirmPassword) {
      setError('As senhas não conferem.');
      return;
    }

    const result = registerOrganizer({
      name: form.name,
      email: form.email,
      password: form.password,
    });

    if (!result.success) {
      setError(result.message ?? 'Não foi possível cadastrar.');
      return;
    }

    setSuccess(result.message ?? 'Cadastro realizado com sucesso!');
    setTimeout(() => navigate('/organizador/eventos'), 800);
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-140px)] max-w-4xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-soft">
        <div className="bg-gradient-to-r from-violet-900 via-violet-700 to-brand-secondary p-8 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <CalendarDays className="h-6 w-6" />
            </div>
            <div className="text-2xl font-black">Cadastro de organizador</div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input label="Nome" value={form.name} onChange={(value) => setForm({ ...form, name: value })} placeholder="Seu nome" />
            <Input label="E-mail" value={form.email} onChange={(value) => setForm({ ...form, email: value })} placeholder="seu@email.com" />
            <div className="grid gap-5 md:grid-cols-2">
              <Input label="Senha" type="password" value={form.password} onChange={(value) => setForm({ ...form, password: value })} placeholder="••••••" />
              <Input label="Confirmar senha" type="password" value={form.confirmPassword} onChange={(value) => setForm({ ...form, confirmPassword: value })} placeholder="••••••" />
            </div>

            {error && <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
            {success && <div className="rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">{success}</div>}

            <Button type="submit" className="w-full">Cadastrar</Button>

            <div className="text-center text-sm text-slate-600">
              Já tem conta? <Link to="/login" className="font-semibold text-brand-primary">Entrar</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
