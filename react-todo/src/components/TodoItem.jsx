import './TodoItem.css';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li 
      className={`todo-item ${todo.completed ? 'completed' : ''}`}
      data-testid={`todo-item-${todo.id}`}
    >
      <span 
        className="todo-text"
        onClick={() => onToggle(todo.id)}
        style={{ cursor: 'pointer', textDecoration: todo.completed ? 'line-through' : 'none' }}
      >
        {todo.text}
      </span>
      <button 
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete ${todo.text}`}
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
