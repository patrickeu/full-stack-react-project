import express from 'express'
import { postRoutes } from './routes/posts.js'
import { userRoutes } from './routes/users.js'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(bodyParser.json())

//define GET routes
app.get('/', (req, res) => {
  res.send('Hello from express udpate 120156789 ')
})

postRoutes(app)
userRoutes(app)

//define routes with a JSON request
app.use(bodyParser.json())

//注意加了{}
export { app }