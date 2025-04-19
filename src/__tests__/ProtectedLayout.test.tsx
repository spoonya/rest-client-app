import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: vi.fn(),
  }),
}));

vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: {
          user: { id: '123', email: 'test@example.com' }, // ← считается авторизованным
        },
      }),
    },
  },
}));

vi.mock('@/components', () => ({
  Preloader: () => <div>Loading...</div>,
}));

vi.mock('@/layouts', () => ({
  DefaultLayout: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

import ProtectedLayout from '@/app/[locale]/(protected)/layout';

describe('ProtectedLayout', () => {
  it('renders children after loading', async () => {
    render(
      <ProtectedLayout>
        <div>Protected Content</div>
      </ProtectedLayout>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
  });
});
