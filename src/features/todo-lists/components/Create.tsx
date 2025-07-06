import { useRef } from "react";
import PlusIcon from "../../../assets/icons/Plus.icon";
import PrimaryButton from "../../../core/components/inputs/primary-button/PrimaryButton";
import "./create.css";
import TextField from "../../../core/components/inputs/text-field/TextField";

interface CreateButtonProps {
  onCreate: (listName: string) => void;
}

const Create = ({ onCreate }: CreateButtonProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = inputRef.current;
    const dialog = dialogRef.current;

    if (input && dialog && input.value.trim()) {
      onCreate(input.value.trim());
      input.value = "";
      dialog.close();
    }
  };

  const handleCancel = () => {
    const dialog = dialogRef.current;
    const input = inputRef.current;

    if (dialog && input) {
      input.value = "";
      dialog.close();
    }
  };

  return (
    <>
      <PrimaryButton onClick={handleClick}>
        <PlusIcon />
        Create
      </PrimaryButton>
      <dialog ref={dialogRef} className="create-dialog">
        <form onSubmit={handleSubmit} className="create-form">
          <h2>Create New Todo List</h2>
          <TextField ref={inputRef} placeholder="Enter list name" />
          <div className="create-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-button">
              Cancel
            </button>
            <PrimaryButton type="submit">Confirm</PrimaryButton>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default Create;
