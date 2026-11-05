# NovaJam — site institucional

Projeto Next.js responsivo baseado no layout Figma `NovaJam — Site institucional` (node `2:4798`).

## Rodar localmente

1. Instale Node.js 20 ou superior.
2. No terminal, entre na pasta do projeto.
3. Execute:

```bash
npm install
npm run dev
```

4. Abra http://localhost:3000.

## Publicar na Vercel

1. Envie esta pasta para um repositório GitHub.
2. Entre em https://vercel.com/new e importe o repositório.
3. Mantenha as configurações padrão do Next.js e clique em Deploy.

## Observações antes de produção

- O formulário abre o aplicativo de e-mail do visitante com a mensagem preenchida. Para receber leads sem depender do e-mail do visitante, conecte um serviço de formulários (por exemplo, Resend/Formspree) e configure as variáveis de ambiente.
- O endereço `oi@novajam.com.br` é um destino provisório no formulário; substitua pelo e-mail real da empresa antes da publicação.
- As fotografias originais do Figma não puderam ser baixadas neste ambiente. As áreas de imagens usam ilustrações CSS provisórias; substitua pelos exports originais do Figma em `public/images` para obter fidelidade visual completa.
- As fontes Space Grotesk e DM Sans são carregadas do Google Fonts.
