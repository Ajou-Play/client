import React from 'react';

import { LoginInputWrapper, LoginInputTitle, LoginInputStyle } from './LoginInput.style';

import type { InputType } from '@Component/.';

export const LoginInput = React.forwardRef<HTMLInputElement, InputType>(
  ({ type, titleContent, icon, placeholder, ...rest }, ref) => (
    <>
      <p className={LoginInputTitle}>{titleContent}</p>
      <div className={LoginInputWrapper}>
        <img
          src={icon}
          alt='아이콘'
        />
        <input
          type={type}
          ref={ref}
          {...rest}
          placeholder={placeholder}
          className={LoginInputStyle}
        />
      </div>
    </>
  ),
);
LoginInput.displayName = 'InputWithTile';
