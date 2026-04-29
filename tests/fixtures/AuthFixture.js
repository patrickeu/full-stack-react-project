export class AuthFixture {
  constructor(page) {
    this.page = page
  }
  async signUpAndLogIn() {
    await page.getByRole('button', { name: '重新加载' }).click();
    await page.getByRole('button', { name: '重新加载' }).click();
    await page.locator('html').click();
    await page.getByRole('textbox', { name: 'Username:' }).click();
    await page.getByRole('textbox', { name: 'Username:' }).fill('test');
    await page.getByRole('textbox', { name: 'Username:' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password:' }).fill('test');
    await page.getByRole('textbox', { name: 'Password:' }).press('Enter');
    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => { });
    });
    await page.getByRole('button', { name: 'Sign Up' }).click();
    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => { });
    });
    await page.getByRole('button', { name: 'Sign Up' }).click();
    await page.getByRole('textbox', { name: 'Password:' }).click();
    const testUser = 'test' + Date.now()
    await this.page.goto('/signup')
    await this.page.getByLabel('Username:').fill(testUser)
    await this.page.getByLabel('Password:').fill('password')
    await this.page.getByRole('button', {
      name: 'Sign Up'
    }).click()
    await this.page.waitForURL('**/login')
    await this.page.getByLabel('Username:').fill(testUser)
    await this.page.getByLabel('Password:').fill('password')
    await this.page.getByRole('button', {
      name: 'Log In'
    }).click()
    await this.page.waitForURL('**/')
    return testUser
  }
}