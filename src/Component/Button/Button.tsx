const ButtonMapType = {
  orange: {
    background: 'bg-primary-orange',
    color: 'text-white',
  },
  grey: {
    background: 'bg-grey-placeholder',
    color: 'text-white',
  },
  lightOrange: {
    background: 'bg-primary-lightOrange',
    color: 'text-primary-orange',
  },
};

export const Button = ({
  type,
  content,
  onClick,
}: {
  type: keyof typeof ButtonMapType;
  content: string;
  onClick?: () => void;
}) => {
  const { background, color } = ButtonMapType[type];
  return (
    <button
      type='button'
      className={`rounded-[6px] px-[1rem] py-[0.2rem] ${background} ${color} whitespace-nowrap`}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
