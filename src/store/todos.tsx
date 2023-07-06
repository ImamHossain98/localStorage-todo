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
  handleAddTodo: (task: string) => void; // call signature
};

export const todosContext = createContext<todosContext | null>(null);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

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
      return newTodos;
    });
  };

  return (
    <todosContext.Provider value={{ todos, handleAddTodo }}>
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
