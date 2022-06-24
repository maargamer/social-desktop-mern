import React from 'react';
import { HashRouter } from 'react-router-dom';
import MainRouter from './MainRouter';
import ScrollToTop from './ScrollToTop';
import './App.css';
const App = () => (
  <div className='App'>
  <HashRouter>
    <ScrollToTop>
      <MainRouter />
    </ScrollToTop>
  </HashRouter>
  </div>
);


export default App;
