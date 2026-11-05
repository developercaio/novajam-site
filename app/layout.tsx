import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NovaJam® — Ideias grandes. Presença digital.',
  description: 'Estratégia, design e tecnologia para criar sites e experiências digitais que fazem sua marca ser vista, lembrada e escolhida.',
  applicationName: 'NovaJam',
  themeColor: '#f2f1ec',
  openGraph: {
    title: 'NovaJam® — Ideias grandes. Presença digital.',
    description: 'Criamos experiências digitais que fazem sua marca ser vista, lembrada e escolhida.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'NovaJam',
  },
};
 
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
