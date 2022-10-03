import React from 'react';
import { useForm } from 'react-hook-form';

const LoginPageWrapper =
  'grid place-content-center align-middle h-screen w-screen text-center gap-[3rem]';
const LoginPageTitle = 'text-[4rem] text-[#FF663F]';

const InputWithTileWrapper = 'flex gap-2 justify-start border-b-[2px]';

const LoginFormWrapper = 'flex flex-col w-[28rem] gap-[1rem] text-start';

const LoginFormButton = 'rounded-[32px] bg-[#FF663F] h-[2.6rem] text-white font-medium';

type LoginFormType = {
  email: string;
  password: string;
};

const InputWithTitle = React.forwardRef<HTMLInputElement, any>(
  ({ titleContent, placeholder, ...rest }, ref) => (
    <>
      <p className='text-[#808080]'>{titleContent}</p>
      <div className={InputWithTileWrapper}>
        <div>icon</div>
        <input
          ref={ref}
          {...rest}
          placeholder={placeholder}
          className='w-screen font-extralight'
        />
      </div>
    </>
  ),
);
InputWithTitle.displayName = 'InputWithTile';

const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginFormType>();

  const onSubmit = () => {};
  return (
    <form
      className={LoginFormWrapper}
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputWithTitle
        titleContent='E-mail'
        placeholder='Type your E-mail'
        {...register('email', { required: true })}
      />
      <InputWithTitle
        titleContent='Password'
        placeholder='Type your password'
        {...register('password', { required: true })}
      />
      <button
        type='button'
        className='text-end text-[#808080] mt-[-1rem]'
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
        className='text-center text-[#808080]'
      >
        or Sign up
      </button>
    </form>
  );
};

export const LoginPage = () => (
  <div className={LoginPageWrapper}>
    <h2 className={LoginPageTitle}>A-Play</h2>
    <LoginForm />
  </div>
);
