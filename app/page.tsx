'use client';

import { useEffect, useState } from 'react';
import {
  ArrowDown, ArrowRight, ArrowUpRight, Asterisk, Check, ChevronDown,
  Code2, Layers3, Menu, MessageCircle, MousePointer2, Palette, Sparkles,
  X, Zap
} from 'lucide-react';

const whatsapp = 'https://wa.me/5531983365148?text=Olá%2C%20vim%20pelo%20site%20da%20NovaJam%20e%20quero%20conversar%20sobre%20um%20projeto.';

const nav: [string, string][] = [
  ['Serviços', '#servicos'], ['Projetos', '#projetos'],
  ['Processo', '#processo'], ['Sobre', '#sobre'],
];

const services = [
  { n: '01', icon: Layers3, title: 'Sites institucionais', text: 'Uma presença digital que apresenta sua empresa com clareza, personalidade e credibilidade.', tags: ['Identidade da marca', 'Design responsivo', 'Conteúdo estratégico'] },
  { n: '02', icon: MousePointer2, title: 'Landing pages', text: 'Páginas focadas em uma mensagem: transformar visitantes interessados em novas conversas.', tags: ['Foco em conversão', 'Experiência objetiva', 'Campanhas digitais'] },
  { n: '03', icon: Palette, title: 'Redesign de sites', text: 'Damos uma nova vida ao seu site com visual atual, navegação intuitiva e melhor experiência.', tags: ['Visual renovado', 'Navegação simples', 'Mobile first'] },
];

const steps = [
  ['01', 'Imersão', 'Entendemos seu negócio, seu público e o que você quer conquistar.'],
  ['02', 'Direção criativa', 'Definimos estrutura, conteúdo e linguagem visual para sua marca.'],
  ['03', 'Desenvolvimento', 'Transformamos o projeto em um site rápido, responsivo e funcional.'],
  ['04', 'Lançamento', 'Revisamos os detalhes e colocamos sua nova presença digital no ar.'],
];

const faqs = [
  ['Quanto tempo leva para criar um site?', 'O prazo depende do tamanho e das funcionalidades do projeto. Depois de entender sua necessidade, alinhamos um cronograma claro antes de começar.'],
  ['Preciso ter textos e fotos prontos?', 'Não necessariamente. Orientamos você sobre os materiais e ajudamos a organizar as informações para que o site conte a história certa.'],
  ['O site funciona em celular?', 'Sim. A experiência é pensada para diferentes tamanhos de tela, de celulares a computadores.'],
  ['Como recebo um orçamento?', 'É só chamar a NovaJam no WhatsApp e contar um pouco sobre sua ideia. Vamos entender o escopo e conversar sobre a melhor solução.'],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleNav = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    document.querySelector(href)?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
    window.history.replaceState(null, '', href);
    setMenuOpen(false);
  };

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <div className="topline" />
      <header className="site-header">
        <a className="logo" href="#inicio" aria-label="NovaJam, início">nova<span>jam</span><Asterisk size={17} /></a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {nav.map(([label, href]) => <a key={href} href={href} onClick={(e) => handleNav(e, href)}>{label}</a>)}
        </nav>
        <a className="button button-small button-light header-cta" href={whatsapp} target="_blank" rel="noreferrer">Vamos conversar <ArrowUpRight size={16} /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      {menuOpen && <nav className="mobile-nav" aria-label="Navegação mobile">
        {nav.map(([label, href]) => <a key={href} href={href} onClick={(e) => handleNav(e, href)}>{label}<ArrowUpRight size={17} /></a>)}
        <a className="mobile-contact" href={whatsapp} target="_blank" rel="noreferrer">Fale com a NovaJam <ArrowUpRight size={17} /></a>
      </nav>}

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> ESTÚDIO DIGITAL · BELO HORIZONTE</div>
          <h1>Ideias grandes.<br /><span>Presença</span><br /><span className="outline-word">digital.</span></h1>
          <p className="hero-lead">Criamos experiências digitais que fazem sua marca ser vista, lembrada e escolhida.</p>
          <div className="hero-actions">
            <a className="button button-accent" href={whatsapp} target="_blank" rel="noreferrer">Comece seu projeto <ArrowUpRight size={18} /></a>
            <a className="text-link" href="#projetos" onClick={(e) => handleNav(e, '#projetos')}>Explorar trabalhos <ArrowDown size={16} /></a>
          </div>
          <div className="hero-footnote"><span className="status-dot" /> Estratégia, design e tecnologia em um só lugar.</div>
        </div>

        <div className="hero-art" aria-label="Composição gráfica abstrata representando um projeto digital">
          <div className="art-grid" />
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="art-label label-top">DESIGN COM INTENÇÃO <Asterisk size={14} /></div>
          <div className="art-card card-back"><span>01 / EXPERIÊNCIA</span><div className="back-lines"><i /><i /><i /></div><b>Clareza em<br />cada detalhe.</b></div>
          <div className="art-card card-front">
            <div className="browser-bar"><span /><span /><span /><small>seuprojeto.com.br</small></div>
            <div className="browser-content"><div className="mini-brand">sua marca<span>.</span></div><div className="mini-kicker">FEITO PARA IR MAIS LONGE</div><div className="mini-headline">O próximo<br />capítulo começa<br /><em>aqui.</em></div><div className="mini-button">Conheça <ArrowUpRight size={12} /></div><div className="mini-shape"><div /></div></div>
          </div>
          <div className="floating-note"><Sparkles size={15} /><span>Ideia boa<br /><b>ganha forma.</b></span></div>
          <div className="art-index">Nº 001 — NOVAJAM®</div>
        </div>
        <div className="hero-bottom"><span>ARRASTE PARA DESCOBRIR</span><span className="hero-bottom-line" /><span>01 / 05</span></div>
      </section>

      <section className="statement" data-reveal>
        <div className="section-shell statement-inner">
          <div className="eyebrow eyebrow-dark">NÃO É SÓ SOBRE ESTAR ONLINE</div>
          <h2>Seu site é o primeiro<br />olá da sua marca<span>.</span></h2>
          <p>Antes da primeira conversa, antes da proposta, antes da escolha. Uma boa presença digital mostra o valor do seu negócio desde o primeiro clique.</p>
          <div className="statement-mark"><Asterisk size={54} /></div>
        </div>
      </section>

      <section className="services section-shell" id="servicos" data-reveal>
        <div className="section-heading">
          <div><div className="eyebrow"><span className="eyebrow-dot" /> O QUE FAZEMOS</div><h2>Digital, do seu<br /><span>jeito.</span></h2></div>
          <p>As ferramentas certas para apresentar sua marca, conquistar confiança e criar novas oportunidades.</p>
        </div>
        <div className="service-grid">
          {services.map(({ n, icon: Icon, title, text, tags }) => <article className="service-card" key={n}>
            <div className="service-top"><span>{n} / SERVIÇO</span><Icon size={23} strokeWidth={1.5} /></div>
            <h3>{title}</h3><p>{text}</p>
            <ul>{tags.map(tag => <li key={tag}><Check size={14} />{tag}</li>)}</ul>
            <a href={whatsapp} target="_blank" rel="noreferrer" className="card-link">Vamos conversar <ArrowUpRight size={17} /></a>
          </article>)}
        </div>
      </section>

      <section className="work-section" id="projetos" data-reveal>
        <div className="section-shell">
          <div className="section-heading work-heading">
            <div><div className="eyebrow eyebrow-dark">EXPLORAÇÕES CRIATIVAS</div><h2>Marcas com<br /><span>presença.</span></h2></div>
            <p>Alguns conceitos visuais para mostrar como estratégia e design podem transformar a percepção de um negócio.</p>
          </div>
          <div className="work-grid">
            <article className="work-item">
              <div className="work-visual work-cafe"><div className="cafe-top"><span>grão.</span><span>CAFÉ · DESDE 2024</span></div><div className="cafe-main"><small>UM TEMPO PRA VOCÊ</small><strong>Seu dia<br />pede uma<br /><i>pausa.</i></strong><div className="coffee-cup"><div /></div></div><div className="cafe-bottom">CAFÉ ESPECIAL, TODOS OS DIAS ↗</div></div>
              <div className="work-caption"><div><span>01 — GASTRONOMIA</span><h3>Grão Café</h3></div><span className="concept-tag">CONCEITO</span></div>
            </article>
            <article className="work-item">
              <div className="work-visual work-architecture"><div className="arch-top"><span>forma<span className="lime-dot">.</span></span><span>ARQUITETURA + INTERIORES</span></div><div className="arch-main"><div className="arch-sun" /><div className="arch-block block-a" /><div className="arch-block block-b" /><div className="arch-block block-c" /><strong>Espaços<br />para viver<br /><i>histórias.</i></strong></div><div className="arch-bottom">ARQUITETURA COM SIGNIFICADO ↗</div></div>
              <div className="work-caption"><div><span>02 — ARQUITETURA</span><h3>Forma Studio</h3></div><span className="concept-tag">CONCEITO</span></div>
            </article>
          </div>
          <p className="work-disclaimer">Os projetos apresentados são estudos conceituais de direção visual.</p>
        </div>
      </section>

      <section className="about-section" id="sobre" data-reveal>
        <div className="section-shell about-layout">
          <div className="about-graphic"><div className="about-orbit" /><div className="about-big">NJ<span>®</span></div><div className="about-sticker"><Asterisk size={22} /> FEITO PARA<br />FAZER ACONTECER</div><span className="about-coordinates">19°55' S · 43°56' W</span></div>
          <div className="about-copy"><div className="eyebrow"><span className="eyebrow-dot" /> QUEM SOMOS</div><h2>Pequenos detalhes.<br /><span>Grandes ideias.</span></h2><p>A NovaJam nasceu da vontade de aproximar boas ideias da tecnologia. Acreditamos que toda empresa tem algo único — e que um site bem pensado ajuda o mundo a perceber isso.</p><p>Unimos criatividade, cuidado e desenvolvimento para construir uma presença digital que faça sentido para o seu negócio.</p><a className="text-link dark-link" href={whatsapp} target="_blank" rel="noreferrer">Conheça a NovaJam <ArrowUpRight size={17} /></a></div>
        </div>
      </section>

      <section className="process-section section-shell" id="processo" data-reveal>
        <div className="process-heading"><div className="eyebrow"><span className="eyebrow-dot" /> COMO ACONTECE</div><h2>Do primeiro papo<br />ao <span>site no ar.</span></h2><p>Um processo simples, transparente e colaborativo. Você acompanha cada etapa.</p></div>
        <div className="steps-grid">{steps.map(([n, title, desc]) => <article className="step" key={n}><span className="step-number">{n}</span><div className="step-line" /><h3>{title}</h3><p>{desc}</p></article>)}</div>
      </section>

      <section className="faq-section" data-reveal>
        <div className="section-shell faq-layout"><div><div className="eyebrow"><span className="eyebrow-dot" /> PERGUNTAS FREQUENTES</div><h2>Vamos tirar<br />as dúvidas<span>?</span></h2><p>Se sua pergunta não estiver aqui, chama a gente.</p><a className="text-link dark-link" href={whatsapp} target="_blank" rel="noreferrer">Pergunte pelo WhatsApp <ArrowUpRight size={17} /></a></div>
          <div className="faq-list">{faqs.map(([question, answer], i) => <article className={activeFaq === i ? 'faq-item open' : 'faq-item'} key={question}><button onClick={() => setActiveFaq(activeFaq === i ? null : i)} aria-expanded={activeFaq === i}><span>{question}</span><ChevronDown size={19} /></button><div className="faq-answer"><p>{answer}</p></div></article>)}</div>
        </div>
      </section>

      <section className="contact-section" id="contato" data-reveal>
        <div className="section-shell contact-inner"><div className="eyebrow eyebrow-dark"><span className="eyebrow-dot" /> SUA PRÓXIMA IDEIA COMEÇA AQUI</div><h2>Vamos fazer<br />algo <span>incrível?</span></h2><p>Conte pra gente o que você está imaginando. A primeira conversa pode ser o começo de algo grande.</p><a className="button button-dark" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Chamar no WhatsApp <ArrowUpRight size={18} /></a><div className="contact-spark"><Asterisk size={100} /></div></div>
      </section>

      <footer className="footer"><div className="section-shell footer-main"><a className="logo footer-logo" href="#inicio">nova<span>jam</span><Asterisk size={17} /></a><span className="footer-slogan">IDEIAS GRANDES. PRESENÇA DIGITAL.</span><a href={whatsapp} target="_blank" rel="noreferrer" className="footer-contact">Vamos conversar <ArrowUpRight size={16} /></a></div><div className="section-shell footer-bottom"><span>© {new Date().getFullYear()} NovaJam. Todos os direitos reservados.</span><span>FEITO COM INTENÇÃO EM BELO HORIZONTE.</span></div></footer>
      <a className="whatsapp-float" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Fale com a NovaJam pelo WhatsApp"><MessageCircle size={23} /><span>Vamos conversar</span></a>
    </main>
  );
}
