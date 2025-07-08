const LeftArrowIcon = ({
  width = "32",
  height = "32",
  color = "currentColor",
  ...props
}) => (
  <svg
    {...props}
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.55112 14.8335L4.1665 9.8335L9.55112 4.8335M4.91437 9.8335L15.8332 9.8335"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default LeftArrowIcon;
