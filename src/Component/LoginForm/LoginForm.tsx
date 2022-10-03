import { useForm } from 'react-hook-form';

import {
  LoginFormWrapper,
  FindPasswordButton,
  LoginFormButton,
  SignUpButton,
} from './LoginForm.style';

import { LoginInput, LoginFormType } from '@Component/.';

export const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginFormType>();

  const onSubmit = (data: LoginFormType) => {
    console.log(data);
  };

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
        className={SignUpButton}
      >
        or Sign up
      </button>
    </form>
  );
};
