interface PlusIconProps {
  color?: string;
}

const PlusIcon = ({ color = "currentColor" }: PlusIconProps) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 10H15M10 5L10 15"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default PlusIcon;
