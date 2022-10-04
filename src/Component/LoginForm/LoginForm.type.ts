export type LoginFormType = {
  email: string;
  password: string;
};

export type LoginFormProps = {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: LoginFormType) => void;
  handleSignUpButton: () => void;
  handleFindPwdButton: () => void;
};
