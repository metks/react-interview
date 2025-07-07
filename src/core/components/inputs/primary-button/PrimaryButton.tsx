import "./primary-button.css";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const PrimaryButton = ({
  children,
  onClick,
  icon,
  disabled,
  ...rest
}: PrimaryButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled} {...rest}>
      {icon && <span className="icon">{icon}</span>}
      {children}
    </button>
  );
};
export default PrimaryButton;
