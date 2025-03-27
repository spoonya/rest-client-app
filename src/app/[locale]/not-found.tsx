import { Button } from 'antd';

import { AppRoutes } from '@/services';

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Button type="primary" href={AppRoutes.HOME}>
        Return Home
      </Button>
    </div>
  );
}
