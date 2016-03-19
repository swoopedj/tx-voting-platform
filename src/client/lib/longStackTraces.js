import Promise from 'bluebird';
Promise.longStackTraces();
require('babel-runtime/core-js/promise').default = Promise;
