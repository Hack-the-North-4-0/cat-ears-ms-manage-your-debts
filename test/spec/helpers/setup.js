/* eslint-disable import/no-dynamic-require,global-require */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');

process.env.NODE_ENV = 'test';

chai.use(chaiAsPromised);
chai.use(chaiHttp);
chai.use(sinonChai);

// Set up globals
global.sinon = require('sinon');

global.expect = chai.expect;
global.request = chai.request;

global.testRequire = module => require(module);

global.importFresh = (module) => require('import-fresh')(module);

global.clearModule = (module) => require('clear-require')(module);

global.startMockRequire = (module, replacement) => require('mock-require')(module, replacement);

global.stopMockRequire = (module) => require('mock-require').stop(module);
