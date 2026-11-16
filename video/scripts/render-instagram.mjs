// Renderiza os vídeos da pauta (src/pauta.ts) em out/instagram/ (MP4, capa 1080x1920 e recorte 4:5) e gera uma página de prévia (spec 19).
// Uso: npm run instagram [id ...]   (sem ids, renderiza todos os que começam com "soc-")
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const ids = [...readFileSync(new URL('../src/pauta.ts', import.meta.url), 'utf8').matchAll(/id: '(soc-[^']+)'/g)].map((m) => m[1]);
const wanted = process.argv.slice(2).length ? process.argv.slice(2) : ids;
const out = new URL('../out/instagram/', import.meta.url);
mkdirSync(out, { recursive: true });

execFileSync('node', ['scripts/sync-config.mjs'], { stdio: 'inherit' });

for (const id of wanted) {
  const file = `out/instagram/${id}`;
  execFileSync('npx', ['remotion', 'render', 'src/index.ts', id, `${file}.mp4`, '--crf=24'], { stdio: 'inherit', shell: true });
  execFileSync('npx', ['remotion', 'still', 'src/index.ts', id, `${file}.png`, '--frame=240'], { stdio: 'inherit', shell: true });
  // Recorte 4:5 para a grade (spec 19, SOC-07): 1080x1350 a partir do y=150, que mantém a marca e o título e deixa o botão e a faixa da zona segura de fora.
  execFileSync('npx', ['remotion', 'ffmpeg', '-y', '-loglevel', 'error', '-i', `${file}.png`, '-vf', 'crop=1080:1350:0:150', '-update', '1', `${file}-4x5.png`], { stdio: 'inherit', shell: true });
}

const cards = ids
  .map((id) => `<figure><video src="${id}.mp4" poster="${id}.png" autoplay muted loop playsinline></video><figcaption>${id}</figcaption></figure>`)
  .join('\n');
writeFileSync(
  new URL('index.html', out),
  `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Prévia dos vídeos do Instagram</title>
<style>body{margin:0;padding:24px;background:#0b1f4d;color:#dbe5ff;font-family:system-ui,sans-serif}h1{font-size:1.2rem}main{display:flex;flex-wrap:wrap;gap:24px}figure{margin:0;width:270px}video{width:270px;height:480px;border-radius:14px;background:#000;display:block}figcaption{font-size:.8rem;margin-top:.4rem}</style>
<h1>Prévia dos vídeos do Instagram (9:16)</h1><main>${cards}</main>`,
);
console.log('Prévia: out/instagram/index.html');
