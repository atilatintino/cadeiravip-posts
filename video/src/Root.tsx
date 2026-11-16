import { Composition } from 'remotion';
import { pauta } from './pauta';
import { Demonstracao, DEMONSTRACAO_DURATION } from './social/Demonstracao';
import { DicaRapida, DICA_DURATION } from './social/DicaRapida';
import { DorSolucao, DOR_SOLUCAO_DURATION } from './social/DorSolucao';
import { PerguntaResposta, PERGUNTA_DURATION } from './social/PerguntaResposta';
import { PerfilCompositions } from './perfil';
import { StoryCompositions } from './stories';
import { WhatsappIA, DURATION } from './WhatsappIA';

const templates = {
  A: { component: DorSolucao, duration: DOR_SOLUCAO_DURATION },
  B: { component: Demonstracao, duration: DEMONSTRACAO_DURATION },
  C: { component: DicaRapida, duration: DICA_DURATION },
  D: { component: PerguntaResposta, duration: PERGUNTA_DURATION },
} as const;

export const Root = () => (
  <>
    <Composition id="WhatsappIA" component={WhatsappIA} durationInFrames={DURATION} fps={30} width={960} height={600} />
    <PerfilCompositions />
    <StoryCompositions />
    {pauta.map((e) => {
      const t = templates[e.template];
      return (
        <Composition
          key={e.id}
          id={e.id}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          component={t.component as any}
          durationInFrames={t.duration}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={e.props}
        />
      );
    })}
  </>
);
