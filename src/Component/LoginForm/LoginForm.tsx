import { useForm } from 'react-hook-form';

import {
  LoginFormWrapper,
  FindPasswordButton,
  LoginFormButton,
  SignUpButton,
} from './LoginForm.style';
import { postLogin } from './LoginForm.util';

import { LoginInput } from '@Component/.';
import type { LoginFormType } from '@Component/.';
import { useMovePage } from '@Hook/.';
import { setStorageItem } from '@Util/storage';

export const LoginForm = () => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>();

  const [moveRegister, moveHome] = useMovePage(['/register', '/main']);

  const onSubmit = (data: LoginFormType) => {
    postLogin({ ...data })
      .then((res) => {
        const {
          data: { userId, accessToken, refreshToken },
        } = res;
        document.cookie = accessToken;
        setStorageItem('refresh', refreshToken);
        setStorageItem('userId', userId);
        moveHome();
      })
      .catch((e) => {
        setError('error', {
          message: '이메일 또는 비밀번호를 확인해주세요.',
        });
      });
  };
  const handleSignUpButton = () => {
    console.log('회원가입');
    moveRegister();
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
        error={!!errors.error}
        {...register('email', { required: true })}
      />
      <LoginInput
        type='password'
        icon='/asset/Lock.svg'
        titleContent='비밀번호'
        placeholder='비밀번호를 입력해주세요'
        error={!!errors.error}
        {...register('password', { required: true })}
      />
      <div
        className={`flex ${
          errors.error !== undefined ? 'flex-row' : 'flex-row-reverse'
        } items-center mt-[-1rem] justify-between`}
      >
        {errors.error !== undefined && <p className=' text-system-error'>{errors.error.message}</p>}
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
