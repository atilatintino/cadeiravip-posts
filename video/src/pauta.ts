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
];
