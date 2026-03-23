import { initDatabase } from './db/init.js'
import { app } from './app.js'
//initialize environment variables
// import dotenv from 'dotenv'
// dotenv.config()

try {
  //init database
  await initDatabase()

  //create server
  const PORT = process.env.PORT
  console.info('current port: ', PORT)
  const DATABASE_URL = process.env.DATABASE_URL
  console.info("current databse: ", DATABASE_URL)
  app.listen(PORT)
  console.info(`express server is running on http://localhost:${PORT}`)
}
catch (err) {
  console.error('error connecting to database: ', err)
}