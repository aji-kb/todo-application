import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import ToDo from './app/component/todo/todo';
import Contact from './app/component/contact/contact';
import Home from './app/component/home/Home';

const container = document.getElementById('root')!;
const root = createRoot(container);

const router = createBrowserRouter([
    {
      path: '/',
      element: <App></App>,
      children:[
        {
          path: '/',
          element: <Home/>,
          index: true
        },
        {
          path: 'todo',
          element: <ToDo/>
        },
        {
          path: 'contact',
          element: <Contact/>
        }
      ]
    }
])

root.render(
  <React.StrictMode>
            <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
