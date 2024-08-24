import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import ToDo from './app/component/todo/todo';

function App() {
  return (
    <div className="App">
        <ToDo></ToDo>
    </div>
  );
}

export default App;
