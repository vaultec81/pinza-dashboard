import React from 'react';
import {render} from 'react-dom';

import {App} from './App';

//For debug only. Do NOT use window.utils directly
import utils from '../main/utils'

window.utils = utils;

render(
  <App />,
  document.getElementById('app')
);