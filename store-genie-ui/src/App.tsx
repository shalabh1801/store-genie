import { AppConfigV2 } from '@shopify/app-bridge';
import { Provider } from '@shopify/app-bridge-react';
import './App.css';
import logo from './logo.svg';

function App() {
  const config: AppConfigV2 = {
    apiKey: '',
    host: ''
  };

  return (
    <Provider config={config}>
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
            Learn React
          </a>
        </header>
      </div>
    </Provider>
  );
}

export default App;
