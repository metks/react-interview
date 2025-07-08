import { ReactNode, useState } from "react";
import Layout from "../../../core/components/layout/Layout";
import { useTodoList, useUpdateTodoList } from "../../../core/api/hooks";
import { useNavigate, useParams } from "react-router-dom";
import PrimaryButton from "../../../core/components/inputs/primary-button/PrimaryButton";
import AddItemModal from "../components/update/add-item-modal/AddItemModal";
import { v4 as uuidv4 } from "uuid";
import IconButton from "../../../core/components/inputs/icon-button/IconButton";
import { LeftArrowIcon } from "../../../assets/icons";

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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Layout>
      <div className="container">
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
        <div>No items in this list</div>
      ) : (
        <ul>
          {todoList.items.map((item) => (
            <li key={item.id}>
              {item.name} - {item.completed ? "Completed" : "Pending"}
            </li>
          ))}
        </ul>
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
