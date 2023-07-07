'use client';
import { ReactNode, createContext, useContext, useState } from 'react';

export type Todo = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
};

export type todosContext = {
  todos: Todo[];
  // call signature
  handleAddTodo: (task: string) => void;
  toggleTodoAsCompleted: (id: string) => void;
  handleTodoDelete: (id: string) => void;
};

export const todosContext = createContext<todosContext | null>(null);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const newTodos = localStorage.getItem('todos') || '[]';
    return JSON.parse(newTodos) as Todo[];
  });

  const handleAddTodo = (task: string) => {
    setTodos((prev) => {
      const newTodos: Todo[] = [
        {
          id: Math.random().toString(),
          task,
          completed: false,
          createdAt: new Date(),
        },

        ...prev,
      ];
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return newTodos;
    });
  };

  // if the task is completed
  const toggleTodoAsCompleted = (id: string) => {
    setTodos((prev) => {
      const newTodos = prev.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return newTodos;
    });
  };

  // if the task is deleted
  const handleTodoDelete = (id: string) => {
    setTodos((prev) => {
      const newTodos = prev.filter((task) => task.id !== id);
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return newTodos;
    });
  };

  return (
    <todosContext.Provider
      value={{ todos, handleAddTodo, toggleTodoAsCompleted, handleTodoDelete }}
    >
      {children}
    </todosContext.Provider>
  );
};

//context api

export function useTodos() {
  const todosContextValue = useContext(todosContext);

  if (!todosContextValue) {
    throw new Error('UseTodos used outside of the Provider');
  }
  return todosContextValue;
}
