import { useForm } from 'react-hook-form';

import {
  LoginFormWrapper,
  FindPasswordButton,
  LoginFormButton,
  SignUpButton,
} from './LoginForm.style';

import { LoginInput } from '@Component/.';
import type { LoginFormType, LoginFormProps } from '@Component/.';

export const LoginForm = ({
  onSubmit,
  handleSignUpButton,
  handleFindPwdButton,
}: LoginFormProps) => {
  const { register, handleSubmit } = useForm<LoginFormType>();

  return (
    <form
      className={LoginFormWrapper}
      onSubmit={handleSubmit(onSubmit)}
    >
      <LoginInput
        titleContent='E-mail'
        placeholder='Type your E-mail'
        {...register('email', { required: true })}
      />
      <LoginInput
        titleContent='Password'
        placeholder='Type your password'
        {...register('password', { required: true })}
      />
      <button
        type='button'
        onClick={handleFindPwdButton}
        className={FindPasswordButton}
      >
        Forgot password?
      </button>
      <button
        type='submit'
        className={LoginFormButton}
      >
        LOGIN
      </button>
      <button
        type='button'
        onClick={handleSignUpButton}
        className={SignUpButton}
      >
        or Sign up
      </button>
    </form>
  );
};
