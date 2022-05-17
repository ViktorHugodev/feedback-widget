import express from 'express'
import { routes } from './routes'
import cors from 'cors'
//Esse arquivo fica responsável apenas por ligar o servidor
const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

//Cria a porta em que daria acesso, no caso a porta 3333
app.listen(process.env.PORT || 3333, () => {
  console.log('listening onn port 3333')
})