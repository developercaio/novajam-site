import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NovaJam — Seu negócio merece um site à altura',
  description: 'Criamos sites que apresentam o seu valor, aproximam clientes e abrem novas oportunidades.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
