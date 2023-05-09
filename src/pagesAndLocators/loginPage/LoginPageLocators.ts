export const LoginPageLocators = {
  email: '[name="email"]',
  password: '[name="password"]',
  logInButton: '//span[contains(text(),"Log in")]',
  forgotPasswordButton: '[href="/reset-password"]',
  wrongEmailOrPassword: '//*[text()="Wrong Email or password"]',
  wrongEmailOrPasswordColor:
    '(//*[text()="Wrong Email or password"] // .. //..)[1]'
};
