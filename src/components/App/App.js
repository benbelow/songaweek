import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {MuiThemeProvider} from 'material-ui';
import './App.css';
import store from '../../redux/store';
import ThreadFetcher from "../ThreadFetcher/ThreadFetcher";
import SubmissionThreads from "../SubmissionThreads";
import AppHeader from "../AppHeader/AppHeader";
import Filters from "../Filters/Filters";
import Route from "react-router/es/Route";
import Redirect from "react-router/es/Redirect";
import Users from "../Users/Users";
import Switch from "react-router/es/Switch";

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
                            <Switch>
                                <Route path='/threads' component={SubmissionThreads}/>
                                <Route path='/users' component={Users}/>
                                <Redirect from='*' to='threads'/>
                            </Switch>
                        </div>
                    </div>
                </MuiThemeProvider>
            </Provider>
        );
    }
}

export default App;
