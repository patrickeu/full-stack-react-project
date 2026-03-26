import express from 'express'
import { postsRoutes } from './routes/posts.js'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(bodyParser.json())

//define GET routes
app.get('/', (req, res) => {
  res.send('Hello from express udpate 20156 ')
})

postsRoutes(app)

//define routes with a JSON request
app.use(bodyParser.json())

//注意加了{}
export { app }