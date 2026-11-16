import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import type { ReactNode } from 'react';
import config from '../config.json';
import { color, font, fontFace } from '../theme';

export const W = 1080;
export const H = 1920;
export const SAFE = 250; // zona que a interface do Instagram cobre (spec 19, RN-06)

export const brl = (cents: number) => `R$ ${(cents / 100).toFixed(2).replace('.', ',')}`;

// Substitui {preço} e {dias} pela configuração (spec 19, RN-03); o roteiro nunca digita esses valores.
export const fill = (text: string) =>
  text.replace('{preço}', brl(config.priceCents)).replace('{dias}', String(config.trialDays));

export const useIn = (at: number, damping = 16) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - at, fps, config: { damping, stiffness: 140 } });
};

export const Frame = ({ duration, cta, children, example = true }: { duration: number; cta: string; children: ReactNode; example?: boolean }) => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [0, 10, duration - 14, duration], [0, 1, 1, 0]);
  const ctaIn = useIn(duration - 95, 14);
  return (
    <AbsoluteFill
      style={{
        fontFamily: font,
        background: `radial-gradient(circle at 20% 12%, #1d3f9a 0%, transparent 52%), radial-gradient(circle at 90% 85%, #123078 0%, transparent 50%), ${color.navy}`,
      }}
    >
      <style>{fontFace}</style>
      <AbsoluteFill style={{ opacity: fade }}>
        <div style={{ position: 'absolute', top: SAFE + 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18 }}>
          <Img src={staticFile('img/logo-cadeiravip.webp')} style={{ width: 72, height: 72 }} />
          <span style={{ color: '#fff', fontSize: 44, fontWeight: 700, letterSpacing: '-.01em' }}>CadeiraVip</span>
        </div>
        {children}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: SAFE + 20,
            display: 'flex',
            justifyContent: 'center',
            opacity: interpolate(ctaIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(ctaIn, [0, 1], [30, 0])}px)`,
          }}
        >
          <div style={{ background: '#fff', color: color.navy, fontWeight: 700, fontSize: 42, padding: '26px 56px', borderRadius: 999, boxShadow: '0 16px 40px rgba(2,8,28,.4)' }}>{fill(cta)}</div>
        </div>
        {example && (
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: SAFE - 40, textAlign: 'center', fontSize: 26, color: color.ice, opacity: 0.7 }}>Exemplo ilustrativo</div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Texto que entra palavra por palavra.
export const Headline = ({ text, top, size = 84, start = 6 }: { text: string; top: number; size?: number; start?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = fill(text).split(' ');
  return (
    <div style={{ position: 'absolute', top, left: 70, right: 70, textAlign: 'center', color: '#fff', fontWeight: 700, fontSize: size, lineHeight: 1.12, letterSpacing: '-.02em' }}>
      {words.map((w, i) => {
        const p = spring({ frame: frame - start - i * 3, fps, config: { damping: 14, stiffness: 160 } });
        return (
          <span key={i} style={{ display: 'inline-block', marginRight: '.28em', opacity: interpolate(p, [0, 1], [0, 1]), transform: `translateY(${interpolate(p, [0, 1], [34, 0])}px)` }}>
            {w}
          </span>
        );
      })}
    </div>
  );
};

export const Card = ({ at, top, height, children }: { at: number; top: number; height?: number; children: ReactNode }) => {
  const p = useIn(at, 18);
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: 90,
        right: 90,
        height,
        padding: 40,
        background: '#fff',
        borderRadius: 40,
        boxShadow: '0 30px 70px rgba(2,8,28,.45)',
        opacity: interpolate(p, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(p, [0, 1], [60, 0])}px)`,
      }}
    >
      {children}
    </div>
  );
};
