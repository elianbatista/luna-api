import express, { Request, Response } from 'express'
import { createConnection } from 'typeorm'
import bodyParser from 'body-parser'
import router from './routes'

const app = express()
const port = 3011

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)

const connection = createConnection().then(() => {
  app.listen(port, () => {
    console.log(`Server running on localhost:${port}`)
  })
}).catch((error) => {
  console.error(error)
});