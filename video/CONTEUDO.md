# Guia de conteudo do @cadeira_vip (automacao diaria)

Publico: donos de barbearia. Tom: simples, direto, pt-BR informal. Visual: identidade azul do CadeiraVip (ja nos templates).

## Rotina diaria (3 Reels, horarios de Sao Paulo)
- 08:00 Dica rapida (template C): 3 dicas curtas de gestao de barbearia.
- 12:00 Pergunta e resposta (template D): duvida comum de dono de barbearia; resposta util.
- 18:00 Produto (template A dor/solucao ou B demonstracao).
Alternar os temas; nunca repetir `id`, titulo ou assunto ja listado em `posted.md`.

## Templates (src/pauta.ts, `Entry`)
- A `DorSolucao`: hook, cardTitle, rows[{time?,text}] (3 linhas), badge, cta
- B `Demonstracao`: hook, cta (animacao fixa de conflito de horario)
- C `DicaRapida`: title, tips[3] (frases curtas, ate ~45 caracteres), cta
- D `PerguntaResposta`: question (~40 car.), answer (~80 car.), detail?, cta
Texto curto: cabe em 1080x1920 e nao pode passar da zona segura. ids novos: `soc-NN-slug` (NN continua a numeracao).
Placeholders aceitos em qualquer texto: `{preço}` e `{dias}` (vem de src/config.json). Nunca digitar preco ou dias.

## Regras de verdade (obrigatorias)
- Nada de depoimento, cliente, estatistica, percentual ou numero inventado.
- Sobre o CadeiraVip, so afirmar o que esta aqui (e o que ja existe em src/pauta.ts):
  - O cliente marca pelo link da barbearia, sem baixar app e sem criar conta (informa nome e telefone).
  - O sistema nao deixa dois clientes no mesmo horario.
  - Teste gratis de {dias} dias, sem cartao.
  - {preço} por mes para a barbearia inteira; barbeiros e agendamentos ilimitados.
- Dicas de gestao (confirmar horario, lembrete, remarcar, fidelizar, precificar, divulgar o link) sao livres, desde que gerais e sem numeros inventados.
- CTA: "Link na bio", "Siga para mais dicas" ou "{dias} dias gratis · Link na bio".

## Legenda
2 a 4 linhas, pt-BR informal, terminar com "Link na bio." quando for produto, mais 4 a 6 hashtags
(#barbearia #barbeiro #gestaodebarbearia #agendamentoonline #donodebarbearia #barbershop).

## Publicacao
Metricool blogId 8136692, rede instagram, `instagramData.type = "REEL"`, fuso America/Sao_Paulo.
Midia = URL raw do GitHub: https://raw.githubusercontent.com/atilatintino/cadeiravip-posts/main/posts/AAAA-MM-DD/HHMM-slug.mp4
