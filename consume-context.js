var reduce = require('lodash/reduce');
var React = require('react');

module.exports = function consumeContext(consumersMap) {
    return function(Compoent) {
        return reduce(consumersMap, reducer, Compoent);
    };
};

function reducer(Compoent, Consumer, propName) {
    return function(props) {
        return React.createElement(Consumer, null, function(value) {
            props[propName] = value;
            return React.createElement(Compoent, props);
        });
    };
}
