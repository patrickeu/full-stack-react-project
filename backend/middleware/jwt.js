import { expressjwt } from 'express-jwt'
//creating middleware
export const requireAuth = expressjwt({
  secret: () => process.env.JWT_SECRET,
  algorithms: ['HS256'],
})

/*
We need to use a function for the secret because
isn’t initialized at import time yet,
dotenv
so the environment variable will only be available later.
*/