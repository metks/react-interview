import { ReactNode } from "react";
import { TodoList } from "../../../../core/api/types";
import "./todo-list-table.css";
import DeleteIcon from "../../../../assets/icons/Delete.icon";
import IconButton from "../../../../core/components/inputs/icon-button/IconButton";

interface TodoListTableProps {
  list: TodoList[];
  onDelete?: (id: number) => void;
}

const TodoListTable = ({ list, onDelete }: TodoListTableProps): ReactNode => {
  return (
    <table className="todo-list-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Items</th>
          <th>Actions</th>
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
          <tr key={item.id}>
            <td className="list-name">{item.name}</td>
            <td>
              <span className="items-count">{item.items.length}</span>
            </td>
            <td className="actions-cell">
              <IconButton
                icon={<DeleteIcon />}
                label={`Delete todo list ${item.name}`}
                onClick={() => onDelete?.(item.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default TodoListTable;
