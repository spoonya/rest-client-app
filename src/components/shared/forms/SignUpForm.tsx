'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { supabase } from '@/lib';
import { Button, Input, Link } from '@heroui/react';

export function SignUpForm() {
  const t = useTranslations('Auth');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      router.push('/');
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      console.log('User data:', data);
      if (data.user) {
        router.replace('/');
      } else {
        setIsChecking(false);
      }
    };

    checkUser();
  }, [router]);

  if (isChecking) {
    return (
      <Image
        src="/loaders/Loader1.svg"
        alt="Loading..."
        width={100}
        height={100}
      />
    );
  }

  return (
    <form
      onSubmit={handleSignUp}
      className="bg-gray-50 dark:bg-zinc-900 rounded-xl shadow-xl p-8 w-full max-w-md mx-auto space-y-6"
    >
      <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
        {t('Sign Up Auth')}
      </h1>

      <div className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full"
        />
      </div>

      <Button
        type="submit"
        radius="lg"
        color="secondary"
        className="w-full px-4 py-2 text-white font-semibold bg-slate-600 hover:bg-slate-700 transition rounded-lg"
      >
        {t('Sign Up')}
      </Button>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        {t('isAuth')}{' '}
        <Link
          href="/sign-in"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          {t('Sign In')}
        </Link>
      </p>
    </form>
  );
}
