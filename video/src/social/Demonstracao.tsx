import { interpolate } from 'remotion';
import { color } from '../theme';
import { Card, Frame, Headline, useIn } from './common';
import { useCurrentFrame } from 'remotion';

export const DEMONSTRACAO_DURATION = 330;

export type DemonstracaoProps = { hook: string; cta: string };

const slots = ['14:00', '15:00', '16:00'];

const Slot = ({ label, state }: { label: string; state: 'idle' | 'picked' | 'taken' | 'final' }) => (
  <div
    style={{
      flex: 1,
      textAlign: 'center',
      padding: '22px 0',
      borderRadius: 22,
      fontSize: 40,
      fontWeight: 700,
      border: `3px solid ${state === 'idle' ? color.line : color.brand}`,
      background: state === 'picked' || state === 'final' ? color.brand : state === 'taken' ? '#f1f5f9' : '#fff',
      color: state === 'picked' || state === 'final' ? '#fff' : state === 'taken' ? color.mute : color.ink,
      textDecoration: state === 'taken' ? 'line-through' : 'none',
      transform: state === 'picked' || state === 'final' ? 'scale(1.06)' : 'none',
    }}
  >
    {label}
  </div>
);

const Msg = ({ at, ok, children }: { at: number; ok: boolean; children: string }) => {
  const p = useIn(at, 14);
  return (
    <div style={{ marginTop: 24, fontSize: 38, fontWeight: 700, color: ok ? color.ok : '#dc2626', opacity: interpolate(p, [0, 1], [0, 1]), transform: `translateY(${interpolate(p, [0, 1], [20, 0])}px)` }}>
      {children}
    </div>
  );
};

// Modelo B (spec 19, SOC-03): demonstração do "sem conflito de horário", dois clientes no mesmo horário.
export const Demonstracao = ({ hook, cta }: DemonstracaoProps) => {
  const frame = useCurrentFrame();
  const a = (i: number) => (i === 1 && frame >= 80 ? (frame >= 135 ? 'final' : 'picked') : 'idle');
  const b = (i: number) => {
    if (i === 1) return frame >= 135 ? 'taken' : frame >= 80 ? 'picked' : 'idle';
    if (i === 2 && frame >= 200) return 'final';
    return 'idle';
  };
  return (
    <Frame duration={DEMONSTRACAO_DURATION} cta={cta}>
      <Headline text={hook} top={380} size={80} />
      <Card at={50} top={770} height={350}>
        <div style={{ fontSize: 36, fontWeight: 700, color: color.soft, marginBottom: 20 }}>Cliente A · Sexta</div>
        <div style={{ display: 'flex', gap: 20 }}>{slots.map((s, i) => <Slot key={s} label={s} state={a(i) as 'idle'} />)}</div>
        {frame >= 135 && <Msg at={135} ok>✓ Agendado às 15:00</Msg>}
      </Card>
      <Card at={70} top={1140} height={350}>
        <div style={{ fontSize: 36, fontWeight: 700, color: color.soft, marginBottom: 20 }}>Cliente B · Sexta</div>
        <div style={{ display: 'flex', gap: 20 }}>{slots.map((s, i) => <Slot key={s} label={s} state={b(i) as 'idle'} />)}</div>
        {frame >= 150 && frame < 200 && <Msg at={150} ok={false}>Esse horário acabou de ser ocupado.</Msg>}
        {frame >= 200 && <Msg at={200} ok>✓ Agendado às 16:00</Msg>}
      </Card>
    </Frame>
  );
};
