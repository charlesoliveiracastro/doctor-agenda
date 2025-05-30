'use server';

import { headers } from 'next/headers';

import { db } from '@/db';
import { clinicsTable, usersToClinicsTable } from '@/db/schema';
import { auth } from '@/lib/auth';

export async function createClinic(name: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error('Usuário não autenticado');
  }

  // Cria a clínica
  const [clinic] = await db.insert(clinicsTable).values({ name }).returning();

  // Associa o usuário à clínica criada
  await db.insert(usersToClinicsTable).values({
    userId: session.user.id,
    clinicId: clinic.id,
  });

  return clinic;
}
