import { AbsoluteFill, Composition, Img, staticFile } from 'remotion';
import { color, font, fontFace } from './theme';

// Imagens do perfil do Instagram (spec 19, SOC-07): foto de perfil e capas dos destaques.
const bg = `radial-gradient(circle at 30% 20%, #1d3f9a 0%, transparent 60%), radial-gradient(circle at 85% 90%, #123078 0%, transparent 55%), ${color.navy}`;

export const FotoPerfil = () => (
  <AbsoluteFill style={{ background: bg, alignItems: 'center', justifyContent: 'center' }}>
    <Img src={staticFile('img/logo-cadeiravip-hd.png')} style={{ height: 780 }} />
  </AbsoluteFill>
);

const icons: Record<string, JSX.Element> = {
  calendario: (
    <g fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="16" width="80" height="74" rx="12" />
      <path d="M10 38h80M32 6v18M68 6v18" />
      <path d="M33 62l11 11 22-22" />
    </g>
  ),
  whatsapp: (
    <g fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 20h72a6 6 0 0 1 6 6v40a6 6 0 0 1-6 6H48L28 90V72H14a6 6 0 0 1-6-6V26a6 6 0 0 1 6-6z" />
      <path d="M30 40h40M30 54h26" />
    </g>
  ),
  preco: (
    <g fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 12h36l40 40-36 36L12 48z" />
      <circle cx="32" cy="32" r="6" />
    </g>
  ),
  duvidas: (
    <g fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="50" cy="50" r="40" />
      <path d="M38 40a12 12 0 1 1 18 10c-4 3-6 5-6 10M50 72v1" />
    </g>
  ),
};

// O Instagram recorta a capa em círculo no centro: o ícone fica dentro dos 600 px centrais.
export const CapaDestaque = ({ icon }: { icon: keyof typeof icons }) => (
  <AbsoluteFill style={{ fontFamily: font, background: bg, alignItems: 'center', justifyContent: 'center' }}>
    <style>{fontFace}</style>
    <svg width="380" height="380" viewBox="0 0 100 100">{icons[icon]}</svg>
  </AbsoluteFill>
);

export const PerfilCompositions = () => (
  <>
    <Composition id="perfil-foto" component={FotoPerfil} durationInFrames={1} fps={30} width={1080} height={1080} />
    {(['calendario', 'whatsapp', 'preco', 'duvidas'] as const).map((icon) => (
      <Composition
        key={icon}
        id={`perfil-destaque-${icon}`}
        component={CapaDestaque}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ icon }}
      />
    ))}
  </>
);
