import { LoginPageWrapper, LoginPageTitle } from './LoginPage.style';

import { LoginForm } from '@Component/.';
import type { LoginFormType } from '@Component/.';

export const LoginPage = () => {
  const onSubmit = (data: LoginFormType) => {
    console.log(data);
  };
  const handleSignUpButton = () => {
    console.log('회원가입');
  };

  const handleFindPwdButton = () => {
    console.log('비밀번호 찾기');
  };

  return (
    <div className={LoginPageWrapper}>
      <h2 className={LoginPageTitle}>A-Play</h2>
      <LoginForm
        onSubmit={onSubmit}
        handleSignUpButton={handleSignUpButton}
        handleFindPwdButton={handleFindPwdButton}
      />
    </div>
  );
};
