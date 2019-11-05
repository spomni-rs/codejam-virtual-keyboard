require('../scss/index.scss');

const App = require('../components/App');
const createElement = require('./lib/create-element');

const appMountPoint = document.body.appendChild(createElement('div'));
App({ node: appMountPoint });
