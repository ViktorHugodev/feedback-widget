import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { api } from "../../lib/api";
import { Loading } from "../../Loading";
import { ScreenShotButton } from "../ScreenShotBottom";

interface FeedbackContetProps {
  feedbackType: FeedbackType;
  handleRestartFeedback: () => void;
  setFeedbackSent: () => void
}

export function FeedbackContentStep({
  setFeedbackSent,
  feedbackType,
  handleRestartFeedback,
}: FeedbackContetProps) {
  const feedbackTypeInfo = feedbackTypes[feedbackType];
  const [screenShotImage, setScreenShotImage] = useState<string | null>(null)
  const [comment, setComment] = useState('')
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)
  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();
    setIsSendingFeedback(true)
    await api.post('feedbacks',{
      type: feedbackType,
      comment,
      screenshot: screenShotImage
    })
    setIsSendingFeedback(false)
    setFeedbackSent();
  }
  return (
    <>
      <header>
        <button
     
          onClick={handleRestartFeedback}
          className="absolute top-5 left-5 text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft />
        </button>
        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>
      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea
        onChange={event => setComment(event.target.value)}
        value={comment}
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100
        border-zinc-600 bg-transparent p-2 rounded-md focus:border-brand-500 focus:ring-1
        focus:outline-none resize-none scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
          placeholder="Conte com detalhes o que esta acontecendo..."
        />
        <footer className="flex flex-2 mt-2 gap-2">
        <ScreenShotButton setScreenShotImage={setScreenShotImage} screenShotImage={screenShotImage}/>
          <button
             disabled={comment.length === 0 || isSendingFeedback}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center
            text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900
            focus:ring-brand-500 transition-colors duration-300 disabled:opacity-50 disabled:hover:bg-brand-500"
            type="submit"
          >
           {isSendingFeedback ? <Loading/> : 'Enviar feedback'} 
          </button>
        </footer>
      </form>
    </>
  );
}
