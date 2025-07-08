import { ReactNode, useState } from "react";
import Modal from "../../../../../core/components/modal/Modal";
import TextField from "../../../../../core/components/inputs/text-field/TextField";
import PrimaryButton from "../../../../../core/components/inputs/primary-button/PrimaryButton";

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (itemName: string) => void;
  loading?: boolean;
}

const AddItemModal = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
}: AddItemModalProps): ReactNode => {
  const [itemName, setItemName] = useState("");

  const handleSubmit = () => {
    if (itemName.trim()) {
      onSubmit(itemName.trim());
      setItemName("");
    }
  };

  const handleClose = () => {
    setItemName("");
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleSubmit();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Item">
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <TextField
          placeholder="Enter item name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          onKeyDown={handleKeyPress}
          autoFocus
          disabled={loading}
        />

        <div
          style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
          <button
            onClick={handleClose}
            disabled={loading}
            style={{
              background: "none",
              border: `1px solid var(--color-border-secondary)`,
              padding: "8px 16px",
              borderRadius: "var(--spacing-xs)",
              cursor: loading ? "not-allowed" : "pointer",
              color: "var(--color-text-secondary)",
              transition: "all 0.2s ease",
            }}>
            Cancel
          </button>

          <PrimaryButton
            onClick={handleSubmit}
            disabled={!itemName.trim() || loading}>
            {loading ? "Adding..." : "Add Item"}
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};

export default AddItemModal;
