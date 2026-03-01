import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { Header } from './Header';

export async function HeaderWrapper() {
  const session = await auth.api.getSession({ headers: await headers() });
  return <Header userId={session?.user.userId} userImage={session?.user.image} />;
}
