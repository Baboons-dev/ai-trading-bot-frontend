'use client';

import { useEffect, useState } from 'react';
import { useClickRef } from '@make-software/csprclick-ui';
import { getSignatureMessage, loginWithWallet } from '@/api/apiCalls/user';
import { useAuthStore } from '@/lib/store/use-store';
import { useRouter } from 'next/navigation';

const useWalletLogin = (redirectPath?: string) => {
  const clickRef = useClickRef();
  const { setToken } = useAuthStore();
  const router = useRouter();
  const [canUseCspr, setCanUseCspr] = useState(false);

  useEffect(() => {
    clickRef?.on('csprclick:loaded', () => {
      setCanUseCspr(true);
    });

    clickRef?.on('csprclick:signed_in', async (evt) => {
      try {
        if (localStorage.getItem('messagedSigned') === 'false') {
          const loginMessage = await getSignatureMessage(
            evt.account.public_key,
          );
          const signed = await clickRef.signMessage(
            loginMessage.message,
            evt.account.public_key,
          );

          const referralCode = localStorage.getItem('referral_code');

          const response = await loginWithWallet({
            publicKey: evt.account.public_key,
            message: loginMessage.message,
            signedMessage: signed?.signatureHex || '',
            referral_code: referralCode || undefined,
          });

          localStorage.removeItem('referral_code');
          localStorage.setItem('token', response.data.access_token);
          localStorage.setItem('refresh_token', response.data.refresh_token);
          document.cookie = `token=${response.data.access_token}; path=/`;
          setToken(response.data.access_token);

          router.push(redirectPath || '/dashboard');
        }
      } catch (e) {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('referral_code');
        document.cookie = ``;
        setToken('');
        clickRef.signOut();
        router.push('/login');
      } finally {
        localStorage.setItem('messagedSigned', 'true');
      }
    });
  }, [clickRef, setToken, router, redirectPath]);

  return { canUseCspr };
};

export default useWalletLogin;