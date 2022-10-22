export type InputType = {
  type: HTMLInputElement['type'];
  titleContent?: string;
  placeholder: HTMLInputElement['placeholder'];
  icon: string;
  error: boolean;
  errorMessage?: string;
};
