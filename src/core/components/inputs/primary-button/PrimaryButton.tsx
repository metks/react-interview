import "./primary-button.css";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const PrimaryButton = ({ children, onClick, disabled }: PrimaryButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
export default PrimaryButton;
