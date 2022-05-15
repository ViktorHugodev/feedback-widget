import { NodemailerAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import express from 'express';


import { SubmitFeedbackService } from './services/submit-feedback-service';
export const routes = express.Router();
//Primeiro parametro a rota. Segundo parametro a função que será executada
//req.query = Acessar query params (para filtros)
//req.params = Acessar route params (para edição, delete)
//req.body = Corpo ou conteudo da requisição


routes.post('/feedbacks', async (req, res) => {
  //Escreve como um objeto JS
  //Dentro do data, coloco os campos de do req.body....
  //Async e await na FN. Const feedback com a resposta pra devoler no resposta
  const {type, comment, screenshot} = req.body;
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const nodemailerAdapter = new NodemailerAdapter()
  const submitFeedbackRepository = new SubmitFeedbackService(prismaFeedbacksRepository, nodemailerAdapter)

  await submitFeedbackRepository.submit({
    type,
    comment,
    screenshot
  })

  //Retorno um status de 201(criação), com o objeto criado
  return res.status(201).send()
})