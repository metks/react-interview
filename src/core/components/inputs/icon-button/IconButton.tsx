import { ReactNode } from "react";
import "./icon-button.css";

interface IconButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
}

const IconButton = ({ icon, label, ...rest }: IconButton): ReactNode => {
  return (
    <button className="icon-button" {...rest} aria-label={label}>
      {icon && <span>{icon}</span>}
    </button>
  );
};

export default IconButton;
