import './globals.css';

export const metadata = {
  title: 'AQUA Platform',
  description: 'Painel administrativo da AQUA Perfumaria.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
