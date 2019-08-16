// React
import React from 'react';
import ReactDOM from 'react-dom';

// Fetch polyfill
import 'whatwg-fetch';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Boutique
import Boutique from './Boutique';

console.log(`
Boutique
Copyright (C) 2019 Alexandra Frock/Cutie Café.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
`);

// rdy 2 rumbl
ReactDOM.render(<Boutique />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//import * as serviceWorker from './serviceWorker';
//serviceWorker.unregister();