import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../core/constants/routes";
import "./todo-list-table.css";
import DeleteIcon from "../../../../assets/icons/Delete.icon";
import IconButton from "../../../../core/components/inputs/icon-button/IconButton";
import { TodoList } from "../../../../core/models/todo-list";

interface TodoListTableProps {
  list: TodoList[];
  onDelete?: (id: number) => void;
}

const TodoListTable = ({ list, onDelete }: TodoListTableProps): ReactNode => {
  const navigate = useNavigate();

  const handleRowClick = (listId: number) => {
    navigate(ROUTES.LIST_DETAIL.replace(":id", listId.toString()));
  };

  return (
    <table className="todo-list-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Items</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {list.length === 0 && (
          <tr>
            <td colSpan={3} className="no-data">
              No todo lists found
            </td>
          </tr>
        )}
        {list.map((item) => (
          <tr
            key={item.id}
            onClick={() => handleRowClick(item.id)}
            className="clickable-row">
            <td className="list-name">
              <span className="list-name-text">{item.name}</span>
            </td>
            <td>
              <span className="items-count">{item.items.length}</span>
            </td>
            <td className="actions-cell">
              <IconButton
                icon={<DeleteIcon />}
                label={`Delete todo list ${item.name}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete?.(item.id);
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default TodoListTable;
