// Lê preço e dias de teste de config/billing.php (spec 19, RN-03) e grava src/config.json.
// Os valores de produção podem vir do .env: passe BILLING_PLAN_PRICE_CENTS e BILLING_TRIAL_DAYS para sobrescrever.
import { readFileSync, writeFileSync } from 'node:fs';

const php = readFileSync(new URL('../../config/billing.php', import.meta.url), 'utf8');
const pick = (key) => Number(php.match(new RegExp(`'${key}'\\s*=>\\s*\\(int\\)\\s*env\\('[A-Z_]+',\\s*(\\d+)\\)`))?.[1]);

const config = {
  trialDays: Number(process.env.BILLING_TRIAL_DAYS ?? pick('trial_days')),
  priceCents: Number(process.env.BILLING_PLAN_PRICE_CENTS ?? pick('plan_price_cents')),
};

if (!config.trialDays || !config.priceCents) throw new Error('Não consegui ler trial_days e plan_price_cents de config/billing.php');

writeFileSync(new URL('../src/config.json', import.meta.url), `${JSON.stringify(config, null, 2)}\n`);
console.log('config.json:', config);
