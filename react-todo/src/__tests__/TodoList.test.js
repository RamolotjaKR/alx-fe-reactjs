import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  // Test 1: Initial Render Test
  test('renders TodoList component with initial todos', () => {
    render(<TodoList />);
    
    // Check if the heading is rendered
    expect(screen.getByText('My Todo List')).toBeInTheDocument();
    
    // Check if initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Master Testing')).toBeInTheDocument();
  });

  // Test 2: Test Adding a Todo
  test('adds a new todo when form is submitted', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Find the input field and add button
    const input = screen.getByPlaceholderText('Enter a new todo...');
    const addButton = screen.getByText('Add Todo');
    
    // Type in the input and submit
    await user.type(input, 'New Todo Item');
    await user.click(addButton);
    
    // Check if the new todo appears in the list
    expect(screen.getByText('New Todo Item')).toBeInTheDocument();
  });

  // Test 3: Test Adding Multiple Todos
  test('adds multiple todos', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('Enter a new todo...');
    const addButton = screen.getByText('Add Todo');
    
    // Add first todo
    await user.type(input, 'First New Todo');
    await user.click(addButton);
    
    // Add second todo
    await user.type(input, 'Second New Todo');
    await user.click(addButton);
    
    // Check if both new todos appear
    expect(screen.getByText('First New Todo')).toBeInTheDocument();
    expect(screen.getByText('Second New Todo')).toBeInTheDocument();
  });

  // Test 4: Test Empty Input Validation
  test('does not add todo with empty input', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const addButton = screen.getByText('Add Todo');
    const initialTodos = screen.getAllByRole('listitem');
    
    // Try to add empty todo
    await user.click(addButton);
    
    // Check that number of todos hasn't changed
    const currentTodos = screen.getAllByRole('listitem');
    expect(currentTodos.length).toBe(initialTodos.length);
  });

  // Test 5: Test Toggling Todo Completion
  test('toggles todo completion status when clicked', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Find a todo item
    const todoText = screen.getByText('Learn React');
    
    // Initially should not be completed (no line-through)
    expect(todoText).toHaveStyle({ textDecoration: 'none' });
    
    // Click to toggle
    await user.click(todoText);
    
    // Should now be completed (with line-through)
    expect(todoText).toHaveStyle({ textDecoration: 'line-through' });
    
    // Click again to toggle back
    await user.click(todoText);
    
    // Should be uncompleted again
    expect(todoText).toHaveStyle({ textDecoration: 'none' });
  });

  // Test 6: Test Multiple Toggle Operations
  test('toggles multiple todos independently', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const todo1 = screen.getByText('Learn React');
    const todo2 = screen.getByText('Build a Todo App');
    
    // Toggle first todo
    await user.click(todo1);
    expect(todo1).toHaveStyle({ textDecoration: 'line-through' });
    expect(todo2).toHaveStyle({ textDecoration: 'none' });
    
    // Toggle second todo
    await user.click(todo2);
    expect(todo1).toHaveStyle({ textDecoration: 'line-through' });
    expect(todo2).toHaveStyle({ textDecoration: 'line-through' });
  });

  // Test 7: Test Deleting a Todo
  test('deletes a todo when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Find the delete button for "Learn React"
    const deleteButton = screen.getAllByText('Delete')[0];
    
    // Verify the todo exists
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    
    // Click delete
    await user.click(deleteButton);
    
    // Verify the todo is removed
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });

  // Test 8: Test Deleting Multiple Todos
  test('deletes multiple todos', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Delete first todo
    const deleteButtons = screen.getAllByText('Delete');
    await user.click(deleteButtons[0]);
    
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Master Testing')).toBeInTheDocument();
    
    // Delete another todo
    const updatedDeleteButtons = screen.getAllByText('Delete');
    await user.click(updatedDeleteButtons[0]);
    
    expect(screen.queryByText('Build a Todo App')).not.toBeInTheDocument();
    expect(screen.getByText('Master Testing')).toBeInTheDocument();
  });

  // Test 9: Test Empty State Message
  test('shows empty message when all todos are deleted', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Delete all todos
    const deleteButtons = screen.getAllByText('Delete');
    for (const button of deleteButtons) {
      await user.click(button);
    }
    
    // Check for empty message
    expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
  });

  // Test 10: Test Input Clears After Adding Todo
  test('clears input field after adding a todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('Enter a new todo...');
    const addButton = screen.getByText('Add Todo');
    
    await user.type(input, 'Test Todo');
    expect(input).toHaveValue('Test Todo');
    
    await user.click(addButton);
    
    // Input should be cleared
    expect(input).toHaveValue('');
  });

  // Test 11: Test Whitespace Handling
  test('trims whitespace from todo input', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('Enter a new todo...');
    const addButton = screen.getByText('Add Todo');
    
    await user.type(input, '   Trimmed Todo   ');
    await user.click(addButton);
    
    expect(screen.getByText('Trimmed Todo')).toBeInTheDocument();
  });

  // Test 12: Test Complete Workflow
  test('complete workflow: add, toggle, and delete', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('Enter a new todo...');
    const addButton = screen.getByText('Add Todo');
    
    // Add a new todo
    await user.type(input, 'Complete Workflow Test');
    await user.click(addButton);
    const newTodo = screen.getByText('Complete Workflow Test');
    expect(newTodo).toBeInTheDocument();
    
    // Toggle it
    await user.click(newTodo);
    expect(newTodo).toHaveStyle({ textDecoration: 'line-through' });
    
    // Delete it
    const deleteButton = screen.getByLabelText('Delete Complete Workflow Test');
    await user.click(deleteButton);
    expect(screen.queryByText('Complete Workflow Test')).not.toBeInTheDocument();
  });
});
