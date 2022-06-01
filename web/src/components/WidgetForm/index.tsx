import { useState } from 'react';
import { CloseButton } from '../CloseButton';
import bugImageUrl from '../../assets/problem.svg';
import ideaImageUrl from '../../assets/idea.svg';
import outherImageUrl from '../../assets/outher.svg';
import { FeedbackTypeStep } from './Steps/FeebackTypeStep';
import { FeedbackContentStep } from './Steps/FeedbackContentStep';
import { FeedbackSucessStep } from './Steps/FeebackSucessStep';
import { ToggleButton } from '../ToggleButton';

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImageUrl,
      alt: 'Imagem de um inseto',
    },
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideaImageUrl,
      alt: 'Imagem de uma lampada',
    },
  },
  OUTHER: {
    title: 'Outro',
    image: {
      source: outherImageUrl,
      alt: 'Imagem de um balão',
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes;
// Limita a seleção da tipagem apenas a key. Caso não tivesse o "keyof", a tipagem seria geral.
//A ideia aqui é tipar apenas a KEY do objeto pro useState
export function WidgetForm() {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);
  function handleRestartFeedback() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }
  return (
    <div
      className='bg-slate-100 dark:bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col 
      items-center 
    shadow-lg w-[calc(100vw-2rem)] md:w-auto'
    >
  
      {feedbackSent ? (
        <FeedbackSucessStep handleRestartFeedback={handleRestartFeedback} />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep setFeedbackType={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              setFeedbackSent={() => setFeedbackSent(true)}
              feedbackType={feedbackType}
              handleRestartFeedback={handleRestartFeedback}
            />
          )}
        </>
      )}

      <footer className='text-xs text-neutral-400 '>
        Feito com ♥ por{' '}
        <a
          className='underline underline-offset-2'
          href='https://github.com/ViktorHugodev'
        >
          Victor
        </a>
        <ToggleButton />
      </footer>
    </div>
  );
}
