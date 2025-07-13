import { ReactNode } from "react";
import { TodoListItem } from "../../../../core/models/todo-list-item";
import "./list-item.css";

interface ListItemProps {
  item: TodoListItem;
  onToggleComplete?: (id: string) => void;
}

const ListItem = ({ item, onToggleComplete }: ListItemProps): ReactNode => {
  const handleToggle = () => {
    onToggleComplete?.(item.id);
  };

  return (
    <tr className="list-item-row">
      <td className="completed-cell">
        <input
          aria-label={`Mark ${item.name} as ${
            item.completed ? "incomplete" : "complete"
          }`}
          type="checkbox"
          checked={item.completed}
          onChange={handleToggle}
          className="completion-checkbox"
        />
      </td>
      <td className={`name-cell ${item.completed ? "completed" : ""}`}>
        {item.name}
      </td>
    </tr>
  );
};

export default ListItem;
