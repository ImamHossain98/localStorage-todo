'use client';
import React, { useState } from 'react';

const AddTodo = () => {
  const [todo, setTodo] = useState('');

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddTodo(todo);
    setTodo('');
  };

  return (
    <form onSubmit={handleFormSubmit} action="">
      <input
        type="text"
        placeholder="write your Todos"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodo;
