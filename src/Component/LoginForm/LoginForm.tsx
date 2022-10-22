import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  LoginFormWrapper,
  FindPasswordButton,
  LoginFormButton,
  SignUpButton,
} from './LoginForm.style';

import { LoginInput } from '@Component/.';
import type { LoginFormType } from '@Component/.';

export const LoginForm = () => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>();

  const navigate = useNavigate();

  const onSubmit = (data: LoginFormType) => {
    setError('email', {
      message: '이메일 또는 비밀번호를 확인해주세요.',
    });
  };
  const handleSignUpButton = () => {
    console.log('회원가입');
    navigate('/register');
  };

  const handleFindPwdButton = () => {
    console.log('비밀번호 찾기');
  };

  return (
    <form
      className={LoginFormWrapper}
      onSubmit={handleSubmit(onSubmit)}
    >
      <LoginInput
        type='text'
        icon='/asset/Person.svg'
        titleContent='이메일'
        placeholder='이메일을 입력해주세요'
        error={!!errors.email}
        {...register('email', { required: true })}
      />
      <LoginInput
        type='password'
        icon='/asset/Lock.svg'
        titleContent='비밀번호'
        placeholder='비밀번호를 입력해주세요'
        error={!!errors.email}
        {...register('password', { required: true })}
      />
      <div
        className={`flex ${
          errors.email !== undefined ? 'flex-row' : 'flex-row-reverse'
        } items-center mt-[-1rem] justify-between`}
      >
        {errors.email !== undefined && <p className=' text-system-error'>{errors.email.message}</p>}
        <button
          type='button'
          onClick={handleFindPwdButton}
          className={FindPasswordButton}
        >
          비밀번호를 잊으셨나요?
        </button>
      </div>
      <br />
      <button
        type='submit'
        className={LoginFormButton}
      >
        로그인
      </button>
      <button
        type='button'
        onClick={handleSignUpButton}
        className={SignUpButton}
      >
        회원가입
      </button>
    </form>
  );
};
