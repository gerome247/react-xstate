import React from 'react';
import logo from './logo.svg';
import './App.css';
import './styles.css';
import { Toggler } from './components/Toggler';
import { TempConv } from './components/TempConv';
import { Counter } from './components/Counter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React & Xstate
        </a>
        <section>
          <div>
            <Toggler />
          </div>
          <div>
            <Counter />
          </div>
          <div>
            <TempConv />
          </div>
        </section>
      </header>
    </div>
  );
}

export default App;
