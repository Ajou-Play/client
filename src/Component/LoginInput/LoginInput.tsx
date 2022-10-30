import React from 'react';

import { LoginInputWrapper, LoginInputTitle } from './LoginInput.style';

import type { InputType } from '@Component/.';

export const LoginInput = React.forwardRef<HTMLInputElement, InputType>(
  ({ type, titleContent, icon, placeholder, error, errorMessage, ...rest }, ref) => (
    <>
      <p className={LoginInputTitle}>{titleContent}</p>
      <div className={LoginInputWrapper}>
        <img
          className='absolute left-0 top-[50%] translate-y-[-50%]'
          src={icon}
          alt='아이콘'
        />
        <input
          type={type}
          ref={ref}
          {...rest}
          placeholder={placeholder}
          className={`w-screen font-extralight h-[3rem] pl-[2rem] mb-[2px] ${
            error ? 'border-system-error' : 'border-grey-line'
          } border-b-[2px] focus:outline-none focus:border-grey-label`}
        />
      </div>
      {error && <p className='text-system-error'>{errorMessage}</p>}
    </>
  ),
);
LoginInput.displayName = 'InputWithTile';
