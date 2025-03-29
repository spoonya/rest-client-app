'use client';

import { AppRoutes } from '@/services';
import { Button } from '@heroui/react';

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Button color="primary" href={AppRoutes.HOME}>
        Return Home
      </Button>
    </div>
  );
}
