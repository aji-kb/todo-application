import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';


import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import ToDo from './app/component/todo/todo';
import Contact from './app/component/contact/contact';
import Home from './app/component/home/Home';
import Login from './app/component/auth/login';
import Profile from './app/component/auth/profile';
import Category from './app/component/category/category';



const container = document.getElementById('root')!;
const root = createRoot(container);

console.log(process.env.REACT_APP_BASE_URL);

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
        },
        {
          path: 'login',
          element: <Login/>
        },
        {
          path: 'profile',
          element: <Profile/>
        },
        {
          path: 'category',
          element: <Category/>
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
