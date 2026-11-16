import { interpolate } from 'remotion';
import { color } from '../theme';
import { Card, Frame, Headline, fill, useIn } from './common';

export const DOR_SOLUCAO_DURATION = 330;

export type DorSolucaoProps = {
  hook: string;
  cardTitle: string;
  rows: { time?: string; text: string }[];
  badge: string;
  cta: string;
};

// Modelo A (spec 19, SOC-02): frase de gancho em cima e a tela do produto resolvendo embaixo.
export const DorSolucao = ({ hook, cardTitle, rows, badge, cta }: DorSolucaoProps) => {
  const badgeIn = useIn(235, 10);
  return (
    <Frame duration={DOR_SOLUCAO_DURATION} cta={cta}>
      <Headline text={hook} top={390} />
      <Card at={80} top={800}>
        <div style={{ fontSize: 40, fontWeight: 700, color: color.ink }}>{fill(cardTitle)}</div>
        <div style={{ marginTop: 22, display: 'grid', gap: 16 }}>
          {rows.map((r, i) => (
            <Row key={i} at={110 + i * 28} {...r} />
          ))}
        </div>
        <div
          style={{
            marginTop: 28,
            padding: '20px 0',
            borderRadius: 24,
            background: color.ok,
            color: '#fff',
            textAlign: 'center',
            fontSize: 46,
            fontWeight: 700,
            opacity: interpolate(badgeIn, [0, 1], [0, 1]),
            transform: `scale(${interpolate(badgeIn, [0, 1], [0.8, 1])})`,
          }}
        >
          ✓ {fill(badge)}
        </div>
      </Card>
    </Frame>
  );
};

const Row = ({ at, time, text }: { at: number; time?: string; text: string }) => {
  const p = useIn(at);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        padding: '20px 28px',
        borderRadius: 24,
        border: `3px solid ${color.line}`,
        fontSize: 40,
        fontWeight: 500,
        color: color.ink,
        opacity: interpolate(p, [0, 1], [0, 1]),
        transform: `translateX(${interpolate(p, [0, 1], [50, 0])}px)`,
      }}
    >
      {time && <span style={{ fontWeight: 700, color: color.brand, minWidth: 120 }}>{time}</span>}
      <span>{fill(text)}</span>
    </div>
  );
};
