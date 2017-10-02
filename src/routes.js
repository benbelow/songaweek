import React from 'react';
import Route from 'react-router/es/Route';
import { BrowserRouter } from 'react-router-dom'

import App from './components/App/App';
import SoundcloudCallback from "./components/SoundcloudCallback";

const Routes = () => (
  <BrowserRouter>
    <div>
      <Route path="/" component={App}/>
      <Route path="/callback.html" component={SoundcloudCallback}/>
    </div>
  </BrowserRouter>
);

export default Routes;