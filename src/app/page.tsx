import AddTodo from '@/components/AddTodo';
import Navbar from '@/components/Navbar';
import Todos from '@/components/Todos';
import React from 'react';
import './globals.css';
import { RiTodoFill } from 'react-icons/ri';

const page = () => {
  return (
    <main>
      <h2>
        <RiTodoFill className="icons" />
        TODO + Next TypeScript
        <RiTodoFill className="icons" />
      </h2>
      <Navbar />
      <AddTodo />
      <Todos />
    </main>
  );
};

export default page;
