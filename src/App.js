import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui';
import './App.css';
import store from './redux/store';
import ThreadFetcher from "./components/ThreadFetcher/ThreadFetcher";
import SubmissionThreads from "./components/SubmissionThreads";
import Filters from './components/Filters/Filters'
import AppHeader from "./components/AppHeader/AppHeader";

class App extends Component {
  render() {
    return (
      <Provider store={store()}>
        <MuiThemeProvider>
          <div className="App">
            <AppHeader/>
            <div className="App-body">
              <ThreadFetcher/>
              <SubmissionThreads/>
            </div>
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
