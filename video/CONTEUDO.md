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
- Sobre o CadeiraVip, so afirmar o que esta nesta lista (vem da spec 19 do projeto, aprovada pelo dono):
  - O cliente marca pelo link da barbearia, sem baixar app e sem criar conta (informa nome e telefone).
  - O sistema nao deixa dois clientes no mesmo horario; a agenda do WhatsApp e a mesma do site.
  - O cliente cancela sozinho pelo link e o dono e avisado.
  - O dono bloqueia almoco e folga na agenda em segundos.
  - Cada barbearia tem seu proprio link (exemplo: suabarbearia.cadeiravip.com.br) para colocar na bio do Instagram.
  - Teste gratis de {dias} dias, sem cartao. Quando o teste acaba, nada e apagado; ao assinar, tudo volta.
  - {preço} por mes para a barbearia inteira; barbeiros e agendamentos ilimitados.
  - WhatsApp: o cliente recebe lembrete do horario pelo WhatsApp e pode responder para confirmar, remarcar ou cancelar.
  - WhatsApp com assistente de IA (opcional): o cliente agenda conversando; o assistente sugere barbeiro e horario livre e so marca depois do "sim" do cliente; passa a conversa para a equipe quando nao entende ou quando o cliente pede; o dono liga e desliga, ensina o que ele pode dizer e testa antes de ligar. Vem desligado.
  - Caixa de conversas no painel: a equipe le e responde as mensagens do WhatsApp sem pegar o celular (o dono liga quando quiser).
- Sobre o assistente de IA NUNCA prometer "atende 24 horas", "sem erro", "substitui o atendente", nem resultado (menos faltas em X%). Dizer so o que esta acima.
- NAO falar de lembretes configuraveis/em degraus, descadastro por intencao, app instalavel (PWA), planos mensais dos clientes nem busca de barbearias: ainda nao estao no ar.
- Video que mostra tela com dados de exemplo usa o template A (ja marca "Exemplo ilustrativo").
- Dicas de gestao (confirmar horario, lembrete, remarcar, fidelizar, precificar, divulgar o link) sao livres, desde que gerais e sem numeros inventados.
- CTA: "Link na bio", "Siga para mais dicas" ou "{dias} dias gratis · Link na bio".

## Legenda
2 a 4 linhas, pt-BR informal; em post de produto, terminar com "Teste {dias} dias grátis. Link na bio." (trocar {dias} por 30, valor de src/config.json) ou so "Link na bio.", mais 4 a 6 hashtags
(#barbearia #barbeiro #gestaodebarbearia #agendamentoonline #donodebarbearia #barbershop).

## Publicacao
Metricool blogId 8136692, rede instagram, `instagramData.type = "REEL"`, fuso America/Sao_Paulo.
Midia = URL raw do GitHub: https://raw.githubusercontent.com/atilatintino/cadeiravip-posts/main/posts/AAAA-MM-DD/HHMM-slug.mp4
