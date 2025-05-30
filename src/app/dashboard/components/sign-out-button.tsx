'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { authClient } from '@/db/auth-client';

type SignOutButtonProps = {
  children: React.ReactNode;
  onSuccess?: () => void; // só pode ser usado quando o pai deste componente for um client component
};

const SignOutButton = ({ children, onSuccess }: SignOutButtonProps) => {
  const router = useRouter();

  const handleSignOut = () => {
    authClient.signOut(
      {},
      {
        onSuccess: () => {
          if (onSuccess) {
            onSuccess();
          } else {
            router.push('/authentication');
          }
        },
        onError: (err) => {
          // Trate o erro se quiser
          console.error(err);
        },
      },
    );
  };

  return <Button onClick={handleSignOut}>{children}</Button>;
};

export default SignOutButton;
