import { interpolate, useCurrentFrame } from 'remotion';
import { color } from '../theme';
import { Frame, fill, useIn } from './common';

export const PERGUNTA_DURATION = 270;

export type PerguntaRespostaProps = { question: string; answer: string; detail?: string; cta: string };

const Typing = ({ from, to }: { from: number; to: number }) => {
  const frame = useCurrentFrame();
  if (frame < from || frame >= to) return null;
  return (
    <div style={{ position: 'absolute', top: 880, right: 90, display: 'flex', gap: 12, padding: '30px 40px', borderRadius: 40, background: color.brand }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ width: 20, height: 20, borderRadius: 20, background: '#fff', opacity: 0.35 + 0.65 * Math.max(0, Math.sin((frame - from) / 3 - i * 0.9)) }} />
      ))}
    </div>
  );
};

// Modelo D (spec 19, SOC-05): dúvida do FAQ da landing e a resposta curta.
export const PerguntaResposta = ({ question, answer, detail, cta }: PerguntaRespostaProps) => {
  const q = useIn(18);
  const a = useIn(105);
  const d = useIn(150);
  return (
    <Frame duration={PERGUNTA_DURATION} cta={cta} example={false}>
      <div style={{ position: 'absolute', top: 440, left: 90, right: 160, padding: '44px 50px', background: '#fff', borderRadius: '44px 44px 44px 10px', fontSize: 58, fontWeight: 700, lineHeight: 1.2, color: color.ink, boxShadow: '0 24px 60px rgba(2,8,28,.4)', opacity: interpolate(q, [0, 1], [0, 1]), transform: `translateY(${interpolate(q, [0, 1], [50, 0])}px)` }}>
        {fill(question)}
      </div>
      <Typing from={70} to={105} />
      <div style={{ position: 'absolute', top: 880, left: 160, right: 90, padding: '44px 50px', background: color.brand, borderRadius: '44px 44px 10px 44px', fontSize: 54, fontWeight: 600, lineHeight: 1.25, color: '#fff', boxShadow: '0 24px 60px rgba(2,8,28,.4)', opacity: interpolate(a, [0, 1], [0, 1]), transform: `translateY(${interpolate(a, [0, 1], [50, 0])}px)` }}>
        {fill(answer)}
      </div>
      {detail && (
        <div style={{ position: 'absolute', top: 1250, left: 90, right: 90, textAlign: 'center', fontSize: 40, color: color.ice, opacity: interpolate(d, [0, 1], [0, 1]) }}>{fill(detail)}</div>
      )}
    </Frame>
  );
};
