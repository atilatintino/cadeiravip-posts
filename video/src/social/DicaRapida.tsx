import { interpolate } from 'remotion';
import { color } from '../theme';
import { Frame, Headline, fill, useIn } from './common';

export const DICA_DURATION = 330;

export type DicaRapidaProps = { title: string; tips: string[]; cta: string };

const Tip = ({ n, at, text, top }: { n: number; at: number; text: string; top: number }) => {
  const p = useIn(at, 15);
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: 90,
        right: 90,
        display: 'flex',
        alignItems: 'center',
        gap: 34,
        padding: '34px 40px',
        background: '#fff',
        borderRadius: 36,
        boxShadow: '0 24px 60px rgba(2,8,28,.4)',
        opacity: interpolate(p, [0, 1], [0, 1]),
        transform: `translateX(${interpolate(p, [0, 1], [-70, 0])}px)`,
      }}
    >
      <div style={{ flex: 'none', width: 96, height: 96, borderRadius: 96, background: color.brand, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 52, fontWeight: 700 }}>{n}</div>
      <div style={{ fontSize: 42, fontWeight: 600, color: color.ink, lineHeight: 1.2 }}>{fill(text)}</div>
    </div>
  );
};

// Modelo C (spec 19, SOC-04): três dicas de gestão em texto animado, sem vender.
export const DicaRapida = ({ title, tips, cta }: DicaRapidaProps) => (
  <Frame duration={DICA_DURATION} cta={cta} example={false}>
    <Headline text={title} top={420} />
    {tips.map((t, i) => (
      <Tip key={i} n={i + 1} at={70 + i * 55} text={t} top={850 + i * 230} />
    ))}
  </Frame>
);
