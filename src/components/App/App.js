import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui';
import './App.css';
import store from '../../redux/store';
import ThreadFetcher from "../ThreadFetcher/ThreadFetcher";
import SubmissionThreads from "../SubmissionThreads";
import AppHeader from "../AppHeader/AppHeader";
import Filters from "../Filters/Filters";

class App extends Component {
  render() {
    return (
      <Provider store={store()}>
        <MuiThemeProvider>
          <div className="App">
            <AppHeader/>
            <Filters/>
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
