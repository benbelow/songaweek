import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui';
import Route from "react-router/es/Route";
import Redirect from "react-router/es/Redirect";
import { BrowserRouter } from "react-router-dom";
import Switch from "react-router/es/Switch";

import store from '../../redux/store';
import ThreadFetcher from "../../scenes/submissionThreads/components/ThreadFetcher/ThreadFetcher";
import SubmissionThreads from "../../scenes/submissionThreads/SubmissionThreads/SubmissionThreads";
import AppHeader from "../AppHeader/AppHeader";
import Filters from "../Filters/Filters";
import Users from "../../scenes/users/components/Leaderboard/Leaderboard";
import Admin from "../../scenes/admin/Admin";
import StatsPage from '../../scenes/stats/StatsPage';
import SoundcloudCallback from "../SoundcloudCallback/SoundcloudCallback";
import FeedbackPage from '../../scenes/feedback/FeedbackPage';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store()}>
          <MuiThemeProvider>
            <div className="App">
              <AppHeader/>
              <Filters/>
              <div className="App-body">
                <ThreadFetcher/>
                <Switch>
                  <Route path='/threads' component={SubmissionThreads}/>
                  <Route path='/users' component={Users}/>
                  <Route path='/admin' component={Admin}/>
                  <Route path='/stats' component={StatsPage}/>
                  <Route path='/feedback' component={FeedbackPage}/>
                  <Route path="/callback.html" component={SoundcloudCallback}/>
                  <Redirect from='*' to='threads'/>
                </Switch>
              </div>
            </div>
          </MuiThemeProvider>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
