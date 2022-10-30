import { RegisterPageWrapper, RegisterPageTitle } from './RegisterPage.style';

import { RegisterForm } from '@Component/.';

export const RegisterPage = () => (
  <div className={RegisterPageWrapper}>
    <h2 className={RegisterPageTitle}>A-Play</h2>
    <RegisterForm />
  </div>
);
