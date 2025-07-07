import { ReactNode } from "react";
import "./icon-button.css";

interface IconButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

const IconButton = ({
  icon,
  label,
  onClick,
  ...rest
}: IconButton): ReactNode => {
  return (
    <button
      className="icon-button"
      onClick={onClick}
      {...rest}
      aria-label={label}>
      {icon && <span>{icon}</span>}
    </button>
  );
};

export default IconButton;
