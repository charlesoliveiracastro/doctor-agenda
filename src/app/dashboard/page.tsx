// Um server component pode ser asincrono e acessar o banco de dados

import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { db } from '@/db';
import { usersToClinicsTable } from '@/db/schema';
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

  const userClinics = await db.query.usersToClinicsTable.findMany({
    where: eq(usersToClinicsTable.userId, session.user.id),
  });

  if (!userClinics.length) {
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
