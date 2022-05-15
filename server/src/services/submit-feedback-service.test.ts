import { SubmitFeedbackService } from "./submit-feedback-service"

const createFeedbackSpy = jest.fn()
const sendEmailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackService(
  {create: createFeedbackSpy},
  {sendMail:sendEmailSpy}
)
describe('Submit feedback', () => {
  //Descrevo o teste, o que deve ser feito, e coloca como parametros as funções
  it('should be able to submit a feedback', async () => {
    
    //Espera que o metodo da função se resolve e não dê erro
    await expect(submitFeedback.submit({
      type: 'BUG',
      comment:'Deu pau vei',
      screenshot: 'data:image/png;base64,sodosd'
    })).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendEmailSpy).toHaveBeenCalled()
  })
  
  it('should not be able to submit a feedback without a type or comment', async () => {
    
    //Espera que o metodo da função se resolve e não dê erro
    await expect(submitFeedback.submit({
      type: '',
      comment:'Deu pau vei',
      screenshot: 'data:image/png;base64,sodosd'  
    })).rejects.toThrow()
  })

  it('should not be able to submit a feedback with an invalid screenshot', async () => {
    
    //Espera que o metodo da função se resolve e não dê erro
    await expect(submitFeedback.submit({
      type: 'BUG',
      comment:'Deu pau vei',
      screenshot: 'test.jpg'  
    })).rejects.toThrow()
  })
})