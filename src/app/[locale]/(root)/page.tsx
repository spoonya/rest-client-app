'use client';

import { motion } from 'framer-motion';
import { Github, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Container } from '@/components';
import { developers, technologies } from '@/data';
import { useAuth } from '@/hooks';
import { supabase } from '@/lib';
import { AppRoutes } from '@/services';
import { Link } from '@heroui/react';

export default function Home() {
  const t = useTranslations('HomePage');
  const authT = useTranslations('Auth');
  const user = useAuth();
  const name = user?.user_metadata.full_name;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      supabase.auth.getUser().finally(() => setIsLoading(false));
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image
          src="/loaders/Loader1.svg"
          alt="Loading..."
          width={100}
          height={100}
        />
      </div>
    );
  }

  return (
    <main className="flex-grow">
      {/* Интро */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="mb-8 inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-slate-200">
              <Image src="/logo.svg" alt="Apicorn" width={40} height={40} />
              <span className="text-xl font-bold text-slate-800">Apicorn</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('title')}
            </h1>
            <p className="text-xl text-slate-600 mb-8">{t('description')}</p>

            {user ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12"
              >
                <h2 className="text-3xl font-semibold mb-6 text-slate-800">
                  {t('welcomeBack', { name })}
                </h2>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href={AppRoutes.REST}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {t('restClient')}
                  </Link>
                  <Link
                    href={AppRoutes.HISTORY}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    {t('history')}
                  </Link>
                  <Link
                    href={AppRoutes.VARS}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    {t('variables')}
                  </Link>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/final.md"
                  className="px-6 py-3 bg-white text-slate-800 rounded-lg hover:bg-slate-50 border border-slate-200 transition-colors"
                  isExternal
                >
                  {t('taskRequirements')}
                </Link>
                <Link
                  href={AppRoutes.SIGN_IN}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t('getStarted')}
                </Link>
              </div>
            )}
          </motion.div>
        </Container>
      </section>

      {/* Технологии */}
      <section className="py-20 bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
            {t('technologies')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-slate-100"
              >
                <tech.icon className="w-12 h-12 mb-6 text-blue-600" />
                <h3 className="text-2xl font-semibold mb-3 text-slate-800">
                  {tech.name}
                </h3>
                <p className="text-slate-600">
                  {t(`technologiesList.${tech.key}`)}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Команда*/}
      <section className="py-20 bg-slate-50">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
            {t('team')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {developers.map((dev, index) => (
              <motion.div
                key={dev.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center relative">
                    {dev.avatar ? (
                      <Image
                        src={dev.avatar}
                        alt={dev.name}
                        className="w-16 h-16 rounded-full"
                        style={{ objectFit: 'cover' }}
                        fill
                      />
                    ) : (
                      <Users className="text-blue-600 w-8 h-8" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800">
                      {dev.name}
                    </h3>
                  </div>
                </div>
                <Link
                  href={dev.git}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  isExternal
                >
                  <Github className="w-5 h-5" />
                  {dev.gitName}
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Ауф */}
      {!user && (
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <Container>
            <div className="text-center max-w-3xl mx-auto text-white">
              <h2 className="text-3xl font-bold mb-6">{t('getStarted')}</h2>
              <p className="text-lg mb-8 opacity-90">{t('authPrompt')}</p>
              <div className="flex justify-center gap-4">
                <Link
                  href={AppRoutes.SIGN_IN}
                  className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-opacity-90 transition-colors font-semibold"
                >
                  {authT('Sign In')}
                </Link>
                <Link
                  href={AppRoutes.SIGN_UP}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold"
                >
                  {authT('Sign Up')}
                </Link>
              </div>
            </div>
          </Container>
        </section>
      )}
    </main>
  );
}
