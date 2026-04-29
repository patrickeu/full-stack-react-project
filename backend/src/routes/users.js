import { createUser, loginUser, getUserInfoById } from '../services/users.js'
export function userRoutes(app) {
  app.get('/api/v1/users/:id', async (req, res) => {
    const userInfo = await getUserInfoById(req.params.id)
    return res.status(200).send(userInfo)
  })

  app.post('/api/v1/user/signup', async (req, res) => {
    try {
      const user = await createUser(req.body)
      return res.status(201).json({ username: user.username })
    } catch (err) {

      return res.status(400).json({
        error: 'failed to create the user, does the username already exist?'
      })
    }
  })

  app.post('/api/v1/user/login', async (req, res) => {
    try {
      const token = await loginUser(req.body)
      console.log(token)
      return res.status(200).send({ token })
    } catch (err) {
      console.log("error is: " + err)
      return res.status(400).send({
        error: 'login failed, did you enter the correct username/ password ? '
      })
    }
  })
}

/* Notes:
 The status() function, in the context of web development libraries like Express.js, returns an response Object which represents the server's response object, 
 but with the HTTP status code set. In general, the function's primary purpose is to set the HTTP status code for the response, not to return a value 
 to the caller of the function itself for typical use. */

/*To keep things simple, the error handling is very rudimentary. It would
be a good idea to distinguish between the different errors that can happen and show a different
error message, depending on the error.*/