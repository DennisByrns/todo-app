import React from 'react';
import ReactDOM from 'react-dom/client';
import { CookiesProvider } from "react-cookie";
import ToDo from './todo';

ReactDOM.createRoot(
  document.getElementById('body')
  ).render(
    <CookiesProvider>
      <ToDo />
    </CookiesProvider>
    );