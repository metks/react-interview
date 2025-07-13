import { ReactNode, useState } from "react";
import Layout from "../../../core/components/layout/Layout";
import { useTodoList, useUpdateTodoList } from "../../../core/api/hooks";
import { useNavigate, useParams } from "react-router-dom";
import PrimaryButton from "../../../core/components/inputs/primary-button/PrimaryButton";
import AddItemModal from "../components/update/add-item-modal/AddItemModal";
import { v4 as uuidv4 } from "uuid";
import IconButton from "../../../core/components/inputs/icon-button/IconButton";
import { LeftArrowIcon } from "../../../assets/icons";
import ListItem from "../components/list-item/LIstItem";

const TodoListDetailScreen = (): ReactNode => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!id) {
    throw new Error("List ID is required");
  }

  const { data: todoList, execute: refetchTodoList } = useTodoList(Number(id));
  const { mutate: updateTodoList } = useUpdateTodoList({
    onSuccess: () => {
      refetchTodoList();
    },
  });

  if (!todoList) {
    return <Layout>Loading...</Layout>;
  }

  const handleAddItem = () => {
    setIsModalOpen(true);
  };

  const handleCreateItem = (itemName: string) => {
    const id = uuidv4();

    updateTodoList({
      id: todoList.id,
      data: {
        name: todoList.name,
        items: [
          ...todoList.items,
          { id: id, name: itemName, completed: false, listId: todoList.id },
        ],
      },
    });
  };

  const handleToggleComplete = (itemId: string) => {
    const updatedItems = todoList.items.map((item) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );

    updateTodoList({
      id: todoList.id,
      data: {
        name: todoList.name,
        items: updatedItems,
      },
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Layout>
      <div className="header-container">
        <div className="container">
          <IconButton
            onClick={() => navigate(-1)}
            icon={<LeftArrowIcon color="#000" width="1.5rem" height="1.5rem" />}
            label="Back"
          />

          <h1>{todoList.name}</h1>
        </div>
        <PrimaryButton onClick={handleAddItem}>Add item</PrimaryButton>
      </div>

      {todoList.items.length === 0 ? (
        <div style={{ padding: "0 var(--spacing-xl)" }}>
          <h2
            style={{
              marginBottom: "var(--spacing-lg)",
              color: "var(--color-text-primary)",
            }}>
            Items
          </h2>
          <table className="list-items-table">
            <thead>
              <tr>
                <th>Completed</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr className="no-data">
                <td colSpan={2} className="no-data">
                  No items in this list
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ padding: "0 var(--spacing-xl)" }}>
          <h2
            style={{
              marginBottom: "var(--spacing-lg)",
              color: "var(--color-text-primary)",
            }}>
            Items
          </h2>
          <table className="list-items-table">
            <thead>
              <tr>
                <th>Completed</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {todoList.items.map((item) => (
                <ListItem
                  key={item.id}
                  item={item}
                  onToggleComplete={handleToggleComplete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddItemModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateItem}
      />
    </Layout>
  );
};

export default TodoListDetailScreen;
