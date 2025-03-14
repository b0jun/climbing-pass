import cn from 'classnames';
import { ButtonHTMLAttributes } from 'react';

type ButtonType = 'button' | 'submit' | 'reset';
type Props = {
  children: React.ReactNode;
  type?: ButtonType;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;

const Button = (props: Props) => {
  const { children, type = 'button', className, ...rest } = props;

  return (
    <button
      type={type}
      className={cn(
        'my-6 h-12 w-full rounded-md bg-main font-bold text-white disabled:bg-gray-200 disabled:text-gray-400/50',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
