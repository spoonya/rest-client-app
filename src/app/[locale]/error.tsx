'use client';

import classes from '@/styles/error.module.scss';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className={classes.error}>
      <div className={classes.oops}>Oops!</div>
      <div className={classes.message}>{error.message}</div>
      <div>
        <button className={classes.retryButton} onClick={() => reset()}>
          🔄 Retry!
        </button>
      </div>
    </div>
  );
}
