import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Route from 'react-router/es/Route';
import {BrowserRouter} from 'react-router-dom'

import App from './components/App/App';
import SoundcloudCallback from "./components/SoundcloudCallback";

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route path="/" component={App}/>
            <Route path="/callback.html" component={SoundcloudCallback}/>
        </div>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
