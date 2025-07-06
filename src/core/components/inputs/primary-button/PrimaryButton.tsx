import "./primary-button.css";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const PrimaryButton = ({
  children,
  onClick,
  disabled,
  ...rest
}: PrimaryButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};
export default PrimaryButton;
