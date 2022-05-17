import { MailAdapter } from "../adapters/mailAdapter";
import { FeedbackRepository } from "./../repositories/feedback-repository";
interface SubmitFeedbackCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackService {
  constructor(
    private feedbackRepository: FeedbackRepository,
    private mailAdapter: MailAdapter
  ) {}

  async submit(request: SubmitFeedbackCaseRequest) {
    const { type, comment, screenshot } = request;
    if (!type || !comment) throw new Error('Type and comment are required')
    
    if(screenshot && !screenshot.startsWith('data:image/png;base64,')) {
      throw new Error('Invalid screenshot');
    }
    await this.feedbackRepository.create({
      type,
      comment,
      screenshot,
    });
    await this.mailAdapter.sendMail({
      subject: "Novo Feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #222;">`,
        `<h3>Tipo do feedback ${type}</h3>`,
        `<p>Comentários: ${comment}</p>`,
        screenshot && `<img src="${screenshot}" />`,
        `</div>`,
      ].join(""),
    });
  }
}
