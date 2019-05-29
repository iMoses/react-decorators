var Enzyme  = require('enzyme');
var Adapter = require('enzyme-adapter-react-16');
var { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
global.document = jsdom.window.document;
global.window = jsdom.window;

Enzyme.configure({adapter: new Adapter});

require('@babel/register');
