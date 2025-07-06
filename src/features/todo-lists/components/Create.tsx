import PlusIcon from "../../../assets/icons/Plus.icon";
import PrimaryButton from "../../../core/components/inputs/primary-button/PrimaryButton";

interface CreateButtonProps {
  onCreate: () => void;
}

const Create = ({ onCreate }: CreateButtonProps) => {
  const handleClick = () => {
    onCreate();
  };

  return (
    <PrimaryButton onClick={handleClick}>
      <PlusIcon />
      Create
    </PrimaryButton>
  );
};

export default Create;
