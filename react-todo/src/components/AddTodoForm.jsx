import { useState } from 'react';
import './AddTodoForm.css';

function AddTodoForm({ onAddTodo }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="Enter a new todo..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        aria-label="New todo input"
      />
      <button type="submit" className="add-btn">
        Add Todo
      </button>
    </form>
  );
}

export default AddTodoForm;
