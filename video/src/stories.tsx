import { AbsoluteFill, Composition, Img, staticFile } from 'remotion';
import { SAFE, fill } from './social/common';
import { color, font, fontFace } from './theme';

// Stories dos destaques do Instagram (spec 19, SOC-07). Textos de docs/instagram-primeiros-posts.md.
// Preço e dias entram como {preço} e {dias} (RN-03); nada de número inventado (RN-01).
type Group = { slug: string; title: string; slides: { text: string; sub?: string }[] };

export const storyGroups: Group[] = [
  {
    slug: 'como-funciona',
    title: 'Como funciona',
    slides: [
      { text: 'Crie a sua barbearia', sub: 'Em menos de 2 minutos você entra no painel.' },
      { text: 'Cadastre serviços e barbeiros', sub: 'Preço, duração e horário de cada um.' },
      { text: 'Divulgue o seu link', sub: 'suabarbearia.cadeiravip.com.br' },
    ],
  },
  {
    slug: 'whatsapp-e-ia',
    title: 'WhatsApp e IA',
    slides: [
      { text: 'Conecte o WhatsApp da barbearia', sub: 'Por QR code.' },
      { text: 'Um assistente de IA conversa', sub: 'E consulta a sua agenda de verdade.' },
      { text: 'Só marca com o “sim” do cliente' },
      { text: 'Você no controle', sub: 'Ensine o que ele pode dizer. Tudo vem desligado: teste antes de ligar.' },
    ],
  },
  {
    slug: 'preco',
    title: 'Preço',
    slides: [
      { text: '{preço} por mês', sub: 'Para a barbearia inteira.' },
      { text: 'Barbeiros e agendamentos ilimitados' },
      { text: '{dias} dias grátis', sub: 'Sem cartão.' },
      { text: 'Cancele quando quiser', sub: 'Sem fidelidade e sem multa.' },
    ],
  },
  {
    slug: 'duvidas',
    title: 'Dúvidas',
    slides: [
      { text: 'Preciso colocar cartão para testar?', sub: 'Não.' },
      { text: 'E quando o teste termina?', sub: 'Nada é apagado. Ao assinar, tudo volta como estava.' },
      { text: 'Meus clientes precisam baixar app?', sub: 'Não.' },
      { text: 'Como cancelo?', sub: 'Pelo Mercado Pago, quando quiser.' },
    ],
  },
];

const bg = `radial-gradient(circle at 20% 12%, #1d3f9a 0%, transparent 52%), radial-gradient(circle at 90% 85%, #123078 0%, transparent 50%), ${color.navy}`;

const Story = ({ title, text, sub, n, total }: { title: string; text: string; sub?: string; n: number; total: number }) => (
  <AbsoluteFill style={{ fontFamily: font, background: bg, color: '#fff' }}>
    <style>{fontFace}</style>
    <div style={{ position: 'absolute', top: SAFE - 60, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 14 }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{ width: 70, height: 10, borderRadius: 10, background: i === n - 1 ? '#fff' : 'rgba(255,255,255,.28)' }} />
      ))}
    </div>
    <div style={{ position: 'absolute', top: SAFE + 40, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18 }}>
      <Img src={staticFile('img/logo-cadeiravip-hd.png')} style={{ height: 84 }} />
      <span style={{ fontSize: 44, fontWeight: 700 }}>CadeiraVip</span>
    </div>
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: '0 90px' }}>
      <div style={{ background: color.brand, padding: '14px 36px', borderRadius: 999, fontSize: 36, fontWeight: 700, letterSpacing: '.02em', marginBottom: 56 }}>{title}</div>
      <div style={{ textAlign: 'center', fontSize: 96, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-.02em', textWrap: 'balance' }}>{fill(text)}</div>
      {sub && <div style={{ marginTop: 48, textAlign: 'center', fontSize: 50, fontWeight: 500, lineHeight: 1.3, color: color.ice }}>{fill(sub)}</div>}
    </AbsoluteFill>
  </AbsoluteFill>
);

export const StoryCompositions = () => (
  <>
    {storyGroups.flatMap((g) =>
      g.slides.map((s, i) => (
        <Composition
          key={`${g.slug}-${i}`}
          id={`story-${g.slug}-${i + 1}`}
          component={Story}
          durationInFrames={1}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ title: g.title, text: s.text, sub: s.sub, n: i + 1, total: g.slides.length }}
        />
      )),
    )}
  </>
);
