import { LoginPageWrapper, LoginPageTitle } from './LoginPage.style';

import { LoginForm } from '@Component/.';

export const LoginPage = () => (
  <div className={LoginPageWrapper}>
    <h2 className={LoginPageTitle}>A-Play</h2>
    <LoginForm />
  </div>
);
