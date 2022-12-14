import { useForm } from 'react-hook-form';

import { RegisterFormWrapper, RegisterFormButton, SignUpButton } from './RegisterForm.style';
import { postRegister } from './RegisterForm.util';

import { LoginInput } from '@Component/.';
import type { RegisterFormType } from '@Component/.';
import { useMovePage } from '@Hook/.';

export const RegisterForm = () => {
  const [moveLogin] = useMovePage('/login');
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>();

  const onSubmit = (data: RegisterFormType) => {
    const { email, name, password, passwordCheck } = data;
    if (password !== passwordCheck)
      setError('passwordCheck', { message: '비밀번호가 일치하지 않습니다.' });
    postRegister({ email, name, password }).then(() => moveLogin());
  };
  const handleSignInButton = () => {
    console.log('로그인');
    moveLogin();
  };

  return (
    <form
      className={RegisterFormWrapper}
      onSubmit={handleSubmit(onSubmit)}
    >
      <LoginInput
        type='text'
        icon='/asset/Person.svg'
        titleContent='닉네임'
        placeholder='닉네임을 입력해주세요'
        error={!!errors.name}
        errorMessage={errors.name?.message}
        {...register('name', {
          required: true,
        })}
      />
      <LoginInput
        type='text'
        icon='/asset/Person.svg'
        titleContent='이메일'
        placeholder='이메일을 입력해주세요'
        error={!!errors.email}
        errorMessage={errors.email?.message}
        {...register('email', {
          required: true,
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
            message: '이메일 형식이 올바르지 않습니다.',
          },
        })}
      />
      <LoginInput
        type='password'
        icon='/asset/Lock.svg'
        titleContent='비밀번호'
        placeholder='비밀번호를 입력해주세요'
        error={!!errors.password}
        errorMessage={errors.password?.message}
        {...register('password', {
          required: true,
          minLength: {
            value: 8,
            message: '비밀번호는 8자 이상이여야 합니다,',
          },
        })}
      />
      <LoginInput
        type='text'
        icon='/asset/Lock.svg'
        titleContent='비밀번호 확인'
        placeholder='비밀번호를 다시 한 번 입력해주세요'
        error={!!errors.passwordCheck}
        errorMessage={errors.passwordCheck?.message}
        {...register('passwordCheck', { required: true })}
      />
      <br />
      <button
        type='submit'
        className={RegisterFormButton}
      >
        회원가입
      </button>
      <button
        type='button'
        onClick={handleSignInButton}
        className={SignUpButton}
      >
        이미 계정이 있으신가요?
      </button>
    </form>
  );
};
