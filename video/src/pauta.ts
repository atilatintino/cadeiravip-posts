import type { DemonstracaoProps } from './social/Demonstracao';
import type { DicaRapidaProps } from './social/DicaRapida';
import type { DorSolucaoProps } from './social/DorSolucao';
import type { PerguntaRespostaProps } from './social/PerguntaResposta';

// Pauta do Instagram (spec 19). Preço e dias de teste entram como {preço} e {dias} (RN-03); nada de número inventado (RN-01).
export type Entry =
  | { id: string; template: 'A'; props: DorSolucaoProps }
  | { id: string; template: 'B'; props: DemonstracaoProps }
  | { id: string; template: 'C'; props: DicaRapidaProps }
  | { id: string; template: 'D'; props: PerguntaRespostaProps };

export const pauta: Entry[] = [
  {
    id: 'soc-01-cliente-marca-sozinho',
    template: 'A',
    props: {
      hook: 'Seu cliente marca sozinho. Você só corta.',
      cardTitle: 'Barbearia Exemplo',
      rows: [{ text: 'Corte' }, { text: 'Carlos' }, { time: '15:00', text: 'Sexta' }],
      badge: 'Agendado',
      cta: 'Link na bio',
    },
  },
  {
    id: 'soc-08-teste-gratis',
    template: 'A',
    props: {
      hook: '{dias} dias grátis, sem cartão',
      cardTitle: 'Sua barbearia no ar',
      rows: [{ text: 'Cadastre os serviços' }, { text: 'Escolha os barbeiros' }, { text: 'Divulgue o seu link' }],
      badge: 'Agenda pronta',
      cta: 'Teste grátis · Link na bio',
    },
  },
  {
    id: 'soc-03-sem-conflito',
    template: 'B',
    props: { hook: 'Dois clientes, mesmo horário? Não aqui.', cta: 'Link na bio' },
  },
  {
    id: 'soc-10-tres-erros',
    template: 'C',
    props: {
      title: '3 erros que esvaziam a agenda',
      tips: ['Marcar horário só por mensagem, sem registro', 'Não avisar o cliente antes do horário', 'Não divulgar o link de agendamento'],
      cta: 'Siga para mais dicas',
    },
  },
  {
    id: 'soc-06-precisa-baixar-app',
    template: 'D',
    props: {
      question: 'Meu cliente precisa baixar app?',
      answer: 'Não. Ele abre o seu link, escolhe o horário e informa nome e telefone.',
      detail: 'Sem app e sem criar conta.',
      cta: 'Link na bio',
    },
  },
  {
    id: 'soc-07-cobra-por-barbeiro',
    template: 'D',
    props: {
      question: 'Cobra por barbeiro ou por agendamento?',
      answer: 'Não. São {preço} por mês para a barbearia inteira.',
      detail: 'Barbeiros e agendamentos ilimitados.',
      cta: '{dias} dias grátis · Link na bio',
    },
  },
  {
    id: 'soc-11-cliente-volta',
    template: 'C',
    props: {
      title: '3 jeitos de fazer o cliente voltar',
      tips: ['Lembre o nome e o corte de cada cliente', 'Chame o cliente quando abrir uma vaga', 'Deixe o próximo horário marcado antes dele sair'],
      cta: 'Siga para mais dicas',
    },
  },
  {
    id: 'soc-12-reduzir-faltas',
    template: 'D',
    props: {
      question: 'Como diminuir as faltas na agenda?',
      answer: 'Confirme o horário um dia antes e facilite a remarcação.',
      detail: 'Quem remarca rápido não some.',
      cta: 'Siga para mais dicas',
    },
  },
  {
    id: 'soc-13-chega-de-caderno',
    template: 'A',
    props: {
      hook: 'Chega de agenda no caderno',
      cardTitle: 'Barbearia Exemplo',
      rows: [{ text: 'Barba' }, { text: 'Rafael' }, { time: '10:30', text: 'Sábado' }],
      badge: 'Agendado',
      cta: 'Link na bio',
    },
  },
  {
    id: 'soc-14-nota-cliente',
    template: 'C',
    props: {
      title: '3 coisas que o cliente nota na barbearia',
      tips: ['Atendimento no horário marcado', 'Ambiente limpo e organizado', 'Preço combinado antes do corte'],
      cta: 'Siga para mais dicas',
    },
  },
  {
    id: 'soc-15-divulgar-link',
    template: 'D',
    props: {
      question: 'Vale divulgar o link no Instagram?',
      answer: 'Vale. Deixe na bio e fixe um post explicando como marcar.',
      detail: 'Quanto menos passos, mais clientes marcam.',
      cta: 'Siga para mais dicas',
    },
  },
  {
    id: 'soc-16-sem-app-sem-cadastro',
    template: 'A',
    props: {
      hook: 'Sem app e sem cadastro: só o link',
      cardTitle: 'Agendamento pelo link',
      rows: [{ text: 'Nome' }, { text: 'Telefone' }, { time: '14:00', text: 'Quinta' }],
      badge: 'Horário reservado',
      cta: 'Link na bio',
    },
  },
  {
    id: 'soc-17-whatsapp-dicas',
    template: 'C',
    props: {
      title: '3 jeitos de usar bem o WhatsApp na barbearia',
      tips: ['Tenha um número só da barbearia', 'Responda rápido, mesmo que seja um "já te falo"', 'Confirme o horário um dia antes'],
      cta: 'Siga para mais dicas',
    },
  },
  {
    id: 'soc-18-ia-so-com-o-sim',
    template: 'D',
    props: {
      question: 'O assistente de IA marca horário sozinho?',
      answer: 'Só depois do sim do cliente. Você liga e desliga quando quiser.',
      detail: 'Ele vem desligado até você ativar.',
      cta: 'Link na bio',
    },
  },
  {
    id: 'soc-19-lembrete-whatsapp',
    template: 'A',
    props: {
      hook: 'Cliente responde o lembrete e pronto',
      cardTitle: 'Lembrete no WhatsApp',
      rows: [{ text: 'Lembrete enviado' }, { text: 'Cliente: "pode confirmar"' }, { time: '15:00', text: 'Amanhã' }],
      badge: 'Confirmado',
      cta: 'Link na bio',
    },
  },
  {
    id: 'soc-20-agenda-organizada',
    template: 'C',
    props: {
      title: '3 hábitos para a agenda não virar bagunça',
      tips: ['Defina o horário de almoço e folga', 'Combine o tempo de cada serviço', 'Revise a agenda do dia seguinte'],
      cta: 'Siga para mais dicas',
    },
  },
  {
    id: 'soc-21-cliente-cancela-sozinho',
    template: 'D',
    props: {
      question: 'O cliente pode cancelar sozinho?',
      answer: 'Pode, pelo link da barbearia. E você é avisado.',
      detail: 'O horário volta a ficar livre.',
      cta: 'Link na bio',
    },
  },
  {
    id: 'soc-22-bloqueia-almoco',
    template: 'A',
    props: {
      hook: 'Bloqueie almoço e folga em segundos',
      cardTitle: 'Agenda do dono',
      rows: [{ text: 'Almoço' }, { text: 'Folga' }, { time: '12:00', text: 'Bloqueado' }],
      badge: 'Horário bloqueado',
      cta: 'Link na bio',
    },
  },
  {
    id: 'soc-23-sabado-cheio',
    template: 'C',
    props: {
      title: '3 dicas para o dia de agenda cheia',
      tips: ['Confirme os horários na véspera', 'Deixe uma folga entre os cortes', 'Chame quem está na espera se vagar'],
      cta: 'Siga para mais dicas',
    },
  },
  {
    id: 'soc-24-agenda-whatsapp-site',
    template: 'D',
    props: {
      question: 'WhatsApp e site têm agendas separadas?',
      answer: 'Não. A agenda do WhatsApp é a mesma do site.',
      detail: 'Dois clientes nunca ficam no mesmo horário.',
      cta: 'Link na bio',
    },
  },
  {
    id: 'soc-25-caixa-de-conversas',
    template: 'A',
    props: {
      hook: 'Responda o WhatsApp sem pegar o celular',
      cardTitle: 'Caixa de conversas',
      rows: [{ text: 'Mensagem recebida' }, { text: 'Equipe responde no painel' }, { time: '16:00', text: 'Horário marcado' }],
      badge: 'Respondido',
      cta: '{dias} dias grátis · Link na bio',
    },
  },
  {
    id: 'soc-26-cliente-novo',
    template: 'C',
    props: {
      title: '3 jeitos de acolher cliente novo',
      tips: ['Pergunte como ele gosta do corte', 'Explique como marcar o próximo', 'Anote o que ele pediu para a volta'],
      cta: 'Siga para mais dicas',
    },
  },
  {
    id: 'soc-27-link-proprio',
    template: 'D',
    props: {
      question: 'Cada barbearia tem seu link?',
      answer: 'Sim. Cada barbearia tem o seu próprio link.',
      detail: 'Ex.: suabarbearia.cadeiravip.com.br',
      cta: 'Link na bio',
    },
  },
  {
    id: 'soc-28-ia-sugere-horario',
    template: 'A',
    props: {
      hook: 'Assistente de IA sugere barbeiro e horário livre',
      cardTitle: 'Conversa no WhatsApp',
      rows: [{ text: 'Cliente pede um horário' }, { text: 'Assistente sugere barbeiro e horário' }, { time: '15:00', text: 'Marca só após o sim' }],
      badge: 'Só marca com o sim',
      cta: '{dias} dias grátis · Link na bio',
    },
  },
  {
    id: 'soc-29-semana-organizada',
    template: 'C',
    props: {
      title: '3 jeitos de organizar a semana',
      tips: ['Defina as folgas com antecedência', 'Bloqueie o horário do almoço', 'Veja a agenda de amanhã hoje à noite'],
      cta: 'Siga para mais dicas',
    },
  },
  {
    id: 'soc-30-fim-do-teste',
    template: 'D',
    props: {
      question: 'E se o teste grátis acabar?',
      answer: 'Nada é apagado. Ao assinar, tudo volta.',
      detail: 'Sem cartão para começar o teste.',
      cta: '{dias} dias grátis · Link na bio',
    },
  },
  {
    id: 'soc-31-ia-passa-equipe',
    template: 'A',
    props: {
      hook: 'Assistente de IA passa a conversa para a equipe',
      cardTitle: 'Conversa no WhatsApp',
      rows: [{ text: 'Cliente manda uma dúvida' }, { text: 'Assistente não entende' }, { text: 'Equipe assume a conversa' }],
      badge: 'Com a equipe',
      cta: '{dias} dias grátis · Link na bio',
    },
  },
  {
    id: 'soc-32-cliente-atrasado',
    template: 'C',
    props: {
      title: '3 jeitos de lidar com atraso',
      tips: ['Combine a tolerância de atraso antes', 'Avise o próximo se alguém atrasar', 'Ajuste a agenda sem correria'],
      cta: 'Siga para mais dicas',
    },
  },
  {
    id: 'soc-33-desligar-assistente',
    template: 'D',
    props: {
      question: 'Posso desligar o assistente de IA?',
      answer: 'Sim. O dono liga e desliga quando quiser.',
      detail: 'Ele já vem desligado.',
      cta: 'Link na bio',
    },
  },
  {
    id: 'soc-34-ensine-assistente',
    template: 'A',
    props: {
      hook: 'Ensine o assistente de IA o que ele pode dizer',
      cardTitle: 'Assistente de IA',
      rows: [{ text: 'Dono ensina o que ele pode dizer' }, { text: 'Dono testa antes de ligar' }, { text: 'Liga e desliga quando quiser' }],
      badge: 'Você no controle',
      cta: '{dias} dias grátis · Link na bio',
    },
  },
  {
    id: 'soc-35-cuidados-preco',
    template: 'C',
    props: {
      title: '3 cuidados ao definir seus preços',
      tips: ['Conheça o seu custo por atendimento', 'Valorize o tempo de cada serviço', 'Deixe a tabela clara para o cliente'],
      cta: 'Siga para mais dicas',
    },
  },
  {
    id: 'soc-36-todos-barbeiros',
    template: 'D',
    props: {
      question: 'Posso cadastrar todos os barbeiros?',
      answer: 'Sim. Barbeiros e agendamentos ilimitados.',
      detail: '{preço} por mês para a barbearia inteira.',
      cta: 'Link na bio',
    },
  },
  {
    id: 'soc-37-remarcar-whatsapp',
    template: 'A',
    props: {
      hook: 'Cliente remarca pelo WhatsApp',
      cardTitle: 'Lembrete do horário',
      rows: [{ text: 'Cliente recebe o lembrete' }, { text: 'Responde para remarcar' }, { text: 'Ou confirma, ou cancela' }],
      badge: 'Pelo WhatsApp',
      cta: '{dias} dias grátis · Link na bio',
    },
  },
  {
    id: 'soc-38-intervalo-clientes',
    template: 'C',
    props: {
      title: '3 jeitos de usar o intervalo',
      tips: ['Deixe a cadeira pronta pro próximo', 'Responda as mensagens pendentes', 'Respire um minuto antes de seguir'],
      cta: 'Siga para mais dicas',
    },
  },
  {
    id: 'soc-39-cliente-ligar',
    template: 'D',
    props: {
      question: 'Cliente precisa ligar para marcar?',
      answer: 'Não. Ele marca pelo link da barbearia.',
      detail: 'Informa só nome e telefone.',
      cta: 'Link na bio',
    },
  },
  {
    id: 'soc-40-dono-avisado-cancelamento',
    template: 'A',
    props: {
      hook: 'Cliente cancelou? Você é avisado',
      cardTitle: 'Cancelamento pelo link',
      rows: [{ text: 'Cliente abre o link' }, { text: 'Cancela sozinho' }, { text: 'Dono é avisado' }],
      badge: 'Você sempre sabe',
      cta: '{dias} dias grátis · Link na bio',
    },
  },
  {
    id: 'soc-41-fechar-o-dia',
    template: 'C',
    props: {
      title: '3 hábitos para fechar o dia',
      tips: ['Confira a agenda de amanhã', 'Deixe o espaço limpo e arrumado', 'Anote o que pode melhorar'],
      cta: 'Siga para mais dicas',
    },
  },
  {
    id: 'soc-42-assistente-vem-desligado',
    template: 'D',
    props: {
      question: 'O assistente de IA já vem ligado?',
      answer: 'Não. Ele vem desligado e você liga quando quiser.',
      detail: 'Opcional no WhatsApp.',
      cta: 'Link na bio',
    },
  },
  {
    id: 'soc-43-teste-antes-de-ligar',
    template: 'A',
    props: {
      hook: 'Teste o assistente antes de ligar',
      cardTitle: 'Assistente de IA',
      rows: [{ text: 'Você ensina o que ele diz' }, { text: 'Testa a conversa' }, { text: 'Liga quando quiser' }],
      badge: 'Você no controle',
      cta: '{dias} dias grátis · Link na bio',
    },
  },
];
