import { render, screen, cleanup } from '@testing-library/react';
import App from './App';
import user from '@testing-library/user-event';

beforeEach(() => {
  // make sure every test starts with no saved tasks
  localStorage.clear();
});

afterEach(() => {
  cleanup();
  localStorage.clear();
  jest.restoreAllMocks();
});

test('renders TODO-LIST heading', () => {
  render(<App />);
  const linkElement = screen.getByText(/TODO-LIST/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders add button', () => {
  render(<App />);
  const addButton = screen.getByRole('button', { name: /add/i });
  expect(addButton).toBeInTheDocument();
});

test('renders task form fields', () => {
  render(<App />);
  const taskInput = screen.getByPlaceholderText(/e.g. Buy groceries/i);
  const dateInput = screen.getByPlaceholderText(/e.g. Milk, eggs, bread/i);
  expect(taskInput).toBeInTheDocument();
  expect(dateInput).toBeInTheDocument();
});

test('renders task list after adding a task', async () => {
  render(<App />);
  await user.type(screen.getByLabelText(/name/i), 'test task');
  await user.type(screen.getByLabelText(/description/i), 'test description');
  await user.click(screen.getByRole('button', { name: /add/i }));
  expect(screen.getByRole('list')).toBeInTheDocument();
});

test('renders empty task message when no tasks', () => {
  render(<App />);
  const emptyTaskMessage = screen.getByText(/no tasks yet.*add one above./i);
  expect(emptyTaskMessage).toBeInTheDocument();
});