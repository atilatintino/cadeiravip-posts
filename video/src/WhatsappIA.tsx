import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { color, font, fontFace } from './theme';

export const DURATION = 390;

const BUBBLE_W = 252;
const GAP = 10;
const VIEW_H = 362;
const PROPOSED_AT = 238; // o assistente propõe o horário
const CONFIRMED_AT = 340; // a agenda recebe o agendamento

type Msg = { at: number; out: boolean; text: string; time: string; typingFrom?: number };

// Conversa fictícia, a mesma do exemplo ilustrativo da landing (spec 18, RN-01).
const messages: Msg[] = [
  { at: 24, out: false, text: 'Quero cortar o cabelo sexta depois do almoço', time: '14:02' },
  { at: 100, out: true, typingFrom: 62, text: 'Tem sim! O Carlos está livre sexta às 15h. Pode ser com ele?', time: '14:02' },
  { at: 160, out: false, text: 'Pode ser', time: '14:03' },
  { at: 238, out: true, typingFrom: 200, text: 'Combinado: corte com o Carlos, sexta, às 15h. Confirmo para você?', time: '14:03' },
  { at: 292, out: false, text: 'Confirma!', time: '14:03' },
  { at: 336, out: true, typingFrom: 310, text: 'Agendado! Te aviso antes do horário.', time: '14:04' },
];

// Altura estimada de cada mensagem (só para rolar o chat de forma suave).
const heightOf = (m: Msg) => {
  const lines = Math.ceil(m.text.length / 22);
  return 24 + (m.out ? 18 : 0) + lines * 20 + 16;
};

const useSpring = (at: number, damping = 16) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - at, fps, config: { damping, stiffness: 140 } });
};

const Ticks = () => (
  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" style={{ marginLeft: 4 }}>
    <path d="M1 5.5 4 8.5 9 1.5M6 8.5 11 1.5" stroke={color.brand} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Bubble = ({ m }: { m: Msg }) => {
  const p = useSpring(m.at);
  const frame = useCurrentFrame();
  const h = heightOf(m) + GAP;
  if (frame < m.at - 1) return <div style={{ height: h }} />;
  return (
    <div style={{ height: h, display: 'flex', justifyContent: m.out ? 'flex-end' : 'flex-start' }}>
      <div
        style={{
          width: 'fit-content',
          maxWidth: BUBBLE_W,
          height: 'fit-content',
          padding: '8px 12px 6px',
          borderRadius: m.out ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
          fontSize: 15,
          lineHeight: '20px',
          fontWeight: 500,
          color: color.ink,
          background: m.out ? color.out : '#fff',
          border: `1px solid ${m.out ? color.outLine : color.line}`,
          boxShadow: '0 1px 2px rgba(15,23,42,.06)',
          opacity: interpolate(p, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(p, [0, 1], [18, 0])}px) scale(${interpolate(p, [0, 1], [0.92, 1])})`,
          transformOrigin: m.out ? 'bottom right' : 'bottom left',
        }}
      >
        {m.out && (
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: color.brand }}>
            Assistente virtual
          </div>
        )}
        {m.text}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontSize: 10, color: color.mute, marginTop: 2 }}>
          {m.time}
          {m.out && <Ticks />}
        </div>
      </div>
    </div>
  );
};

const Typing = ({ from, to }: { from: number; to: number }) => {
  const frame = useCurrentFrame();
  if (frame < from || frame >= to) return null;
  return (
    <div
      style={{
        position: 'absolute',
        right: 16,
        bottom: 10,
        display: 'flex',
        gap: 5,
        padding: '10px 14px',
        borderRadius: 14,
        background: color.out,
        border: `1px solid ${color.outLine}`,
      }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 7,
            height: 7,
            borderRadius: 7,
            background: '#6b8f57',
            opacity: 0.35 + 0.65 * Math.max(0, Math.sin((frame - from) / 3 - i * 0.9)),
          }}
        />
      ))}
    </div>
  );
};

const Phone = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // rolagem: cada mensagem nova empurra a lista para cima
  let cum = 0;
  let prevTarget = 0;
  let scroll = 0;
  for (const m of messages) {
    cum += heightOf(m) + GAP;
    const target = Math.max(0, cum - VIEW_H + 30);
    const s = spring({ frame: frame - m.at, fps, config: { damping: 20, stiffness: 120 } });
    scroll += s * (target - prevTarget);
    prevTarget = target;
  }

  return (
    <div
      style={{
        width: 330,
        height: 520,
        borderRadius: 40,
        background: '#0a1633',
        padding: 9,
        boxShadow: '0 30px 70px rgba(2,8,28,.55), 0 0 0 1px rgba(255,255,255,.08) inset',
      }}
    >
      <div style={{ position: 'relative', height: '100%', borderRadius: 32, overflow: 'hidden', background: color.chat, display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: color.navy, color: '#fff', padding: '34px 16px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 38, background: color.brand, display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 16 }}>B</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15, lineHeight: '18px' }}>Barbearia Exemplo</div>
            <div style={{ fontSize: 11, color: color.ice }}>online</div>
          </div>
        </div>
        <div style={{ position: 'relative', flex: 1, overflow: 'hidden', padding: '0 14px' }}>
          <div style={{ position: 'absolute', left: 14, right: 14, top: 12, transform: `translateY(${-scroll}px)` }}>
            {messages.map((m) => (
              <Bubble key={m.at} m={m} />
            ))}
          </div>
          {messages
            .filter((m) => m.typingFrom)
            .map((m) => (
              <Typing key={m.at} from={m.typingFrom!} to={m.at} />
            ))}
        </div>
        <div style={{ padding: '8px 12px 14px', background: color.chat }}>
          <div style={{ height: 36, borderRadius: 18, background: '#fff', border: `1px solid ${color.line}`, padding: '0 14px', display: 'flex', alignItems: 'center', fontSize: 13, color: color.mute }}>
            Mensagem
          </div>
        </div>
      </div>
    </div>
  );
};

const rows = [
  { t: '14:00', who: 'Marcos', what: 'Barba' },
  { t: '14:30', who: null, what: 'Livre' },
  { t: '15:00', who: null, what: 'Livre', mine: true },
  { t: '15:30', who: 'Pedro', what: 'Corte' },
];

const Agenda = () => {
  const frame = useCurrentFrame();
  const enter = useSpring(150, 18);
  const confirm = useSpring(CONFIRMED_AT, 12);
  const holding = frame >= PROPOSED_AT && frame < CONFIRMED_AT;
  const pulse = holding ? 0.5 + 0.5 * Math.sin(frame / 4) : 0;
  return (
    <div
      style={{
        width: 340,
        padding: 18,
        borderRadius: 20,
        background: '#fff',
        boxShadow: '0 30px 70px rgba(2,8,28,.45)',
        opacity: interpolate(enter, [0, 1], [0, 1]),
        transform: `translateX(${interpolate(enter, [0, 1], [40, 0])}px)`,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontWeight: 700, fontSize: 18, color: color.ink }}>Agenda</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: color.soft }}>Sexta</div>
      </div>
      <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
        {rows.map((r) => {
          const filled = r.mine && frame >= CONFIRMED_AT;
          const reserving = r.mine && holding;
          const solid = Boolean(r.who) || filled;
          return (
            <div
              key={r.t}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 12px',
                borderRadius: 12,
                border: `1.5px ${solid ? 'solid' : 'dashed'} ${filled ? color.brand : reserving ? `rgba(29,78,216,${0.35 + pulse * 0.5})` : color.line}`,
                background: filled ? color.brandSoft : '#fff',
                color: solid ? color.ink : color.mute,
                fontSize: 14,
                fontWeight: 500,
                transform: filled ? `scale(${1 + 0.04 * (1 - Math.min(confirm, 1))})` : 'none',
              }}
            >
              <span style={{ fontWeight: 700, color: color.brand, minWidth: 44 }}>{r.t}</span>
              <span style={{ flex: 1 }}>
                {r.mine ? (filled ? 'Carlos · Corte' : reserving ? 'Reservando…' : 'Livre') : r.who ? `${r.who} · ${r.what}` : r.what}
              </span>
              {filled && <span style={{ fontSize: 11, fontWeight: 700, color: color.ok, opacity: Math.min(confirm, 1) }}>✓ WhatsApp</span>}
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 12, fontSize: 11, color: color.mute }}>Sem horário duplicado: a agenda é a mesma do site.</div>
    </div>
  );
};

export const WhatsappIA = () => {
  const frame = useCurrentFrame();
  // fade de entrada e de saída para o loop não "pular"
  const opacity = interpolate(frame, [0, 10, DURATION - 14, DURATION], [0, 1, 1, 0]);
  return (
    <AbsoluteFill
      style={{
        fontFamily: font,
        background: `radial-gradient(circle at 25% 20%, #1d3f9a 0%, transparent 55%), radial-gradient(circle at 85% 90%, #123078 0%, transparent 50%), ${color.navy}`,
      }}
    >
      <style>{fontFace}</style>
      <AbsoluteFill style={{ opacity, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 56 }}>
        <Phone />
        <Agenda />
      </AbsoluteFill>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 12, textAlign: 'center', fontSize: 12, color: color.ice, opacity: opacity * 0.7 }}>
        Exemplo ilustrativo
      </div>
    </AbsoluteFill>
  );
};
