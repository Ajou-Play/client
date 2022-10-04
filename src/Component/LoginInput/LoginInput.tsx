import React from 'react';

import { LoginInputWrapper, LoginInputTitle, LoginInputStyle } from './LoginInput.style';

import type { InputType } from '@Component/.';

export const LoginInput = React.forwardRef<HTMLInputElement, InputType>(
  ({ titleContent, placeholder, ...rest }, ref) => (
    <>
      <p className={LoginInputTitle}>{titleContent}</p>
      <div className={LoginInputWrapper}>
        <div>icon</div>
        <input
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
