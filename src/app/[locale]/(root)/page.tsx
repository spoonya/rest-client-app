import { useTranslations } from 'next-intl';

import { Container } from '@/components/ui';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <Container>
      <h1>{t('title')}</h1>
    </Container>
  );
}
