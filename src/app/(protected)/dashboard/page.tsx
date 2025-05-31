// Um server component pode ser asincrono e acessar o banco de dados

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';

import SingOutButton from './components/sign-out-button';

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Se não estiver logado, redireciona para /authentication
  if (!session?.user) {
    redirect('/authentication');
  }

  if (!session?.user.clinic) {
    redirect('/clinic-form');
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h1>{session.user.name}</h1>
      <h1>{session.user.email}</h1>
      <SingOutButton>Sair da Conta</SingOutButton>
    </div>
  );
};

export default DashboardPage;
