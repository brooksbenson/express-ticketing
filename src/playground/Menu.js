import React from 'react';
import ReactDOM from 'react-dom';
import { slide as Menu } from 'react-burger-menu';

const appRoot = document.querySelector('#app');

const PageMenu = () => (
  <Menu>
    <ul>
      <li> Item one </li>
      <li> Item two </li>
    </ul>
  </Menu>
);

const Page = () => (
  <main>
    <PageMenu />
    <h1> Header </h1>
    <p> Some characters </p>
  </main>
);

ReactDOM.render(<Page />, appRoot);
