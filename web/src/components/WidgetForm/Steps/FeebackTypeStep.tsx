import { FeedbackType, feedbackTypes } from '..';
import { CloseButton } from '../../CloseButton';

interface setFeedbackType {
  setFeedbackType: (feedbackType: FeedbackType | null) => void;
}
export function FeedbackTypeStep({ setFeedbackType }: setFeedbackType) {
  return (
    <>
      <header>
        <span className='text-xl leading-6 dark:text-violet-200 text-violet-800'>Deixe seu feedback</span>
        <CloseButton />
      </header>
      <div className='flex py-8 gap-2 w-full'>
        {Object.entries(feedbackTypes).map(([key, value]) => {
          return (
            <button
              onClick={() => setFeedbackType(key as FeedbackType)}
              key={key}
              type='button'
              className='bg-slate-400 dark:bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col 
      items-center gap-2 border-2 border-transparent hover:border-slate-700 dark:hover:border-brand-500
      focus:border-brand-500 focus:outline-none'
            >
              <img src={value.image.source} alt={value.image.alt} />
              <span className='dark:text-neutral-200 text-neutral-800' >{value.title}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
