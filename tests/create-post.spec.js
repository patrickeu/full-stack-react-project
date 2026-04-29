import { test, expect } from './fixtures/index.js'
test('allows creating a new post', async ({ page, auth }) => {
  const testUser = await auth.signUpAndLogIn()
})