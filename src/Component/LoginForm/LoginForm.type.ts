export type LoginFormType = {
  email: string;
  password: string;
};

export type LoginFormProps = {
  onSubmit: (data: LoginFormType) => void;
  handleSignUpButton: () => void;
  handleFindPwdButton: () => void;
};
