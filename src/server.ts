import express from 'express'
import pino from 'pino'
import pinoHttp from 'pino-http'

const app = express()
const port = process.env.PORT || 3000

const logger = pino()
pinoHttp({ logger })
app.use(pino)

app.get('/', (req, res) => {
  res.send('Express')
})

app.listen(port, () => {
  logger.info(`Listening on http://localhost:${port}`)
})