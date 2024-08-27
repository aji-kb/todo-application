import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Root from './app/component/root/root';

function App() {

  useEffect(()=>{
    console.log('App');
  })
  return (
    <div className="App">
        <Root></Root>
    </div>
  );
}

export default App;
