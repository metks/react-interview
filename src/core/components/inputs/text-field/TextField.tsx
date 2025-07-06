import { ReactNode, forwardRef } from "react";
import "./textfield.css";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ placeholder, ...props }, ref): ReactNode => {
    return (
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        className="text-field"
        {...props}
      />
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
