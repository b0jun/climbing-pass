import { ClientProviders } from './ClientProviders';

interface ProviderProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProviderProps) {
  return <ClientProviders>{children}</ClientProviders>;
}
