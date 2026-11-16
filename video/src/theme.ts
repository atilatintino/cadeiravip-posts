import { staticFile } from 'remotion';

// Tokens da identidade azul (specs 13/14), os mesmos da landing.
export const color = {
  navy: '#0b1f4d',
  brand: '#1d4ed8',
  brandSoft: '#eaf0ff',
  ink: '#0f172a',
  soft: '#475569',
  mute: '#94a3b8',
  line: '#dbe3f3',
  chat: '#eaf0fb',
  out: '#dcf8c6',
  outLine: '#b7e4a0',
  ok: '#16a34a',
  ice: '#dbe5ff',
};

export const fontFace = ['500', '600', '700']
  .map(
    (w) =>
      `@font-face { font-family: Poppins; font-weight: ${w}; src: url(${staticFile(`fonts/poppins-${w}-latin.woff2`)}) format('woff2'); }`,
  )
  .join('\n');

export const font = 'Poppins, system-ui, sans-serif';
