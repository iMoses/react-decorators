var reduce = require('lodash/reduce');
var React = require('react');

/**
 *
 * @param consumersMap
 * @returns {function}
 */
module.exports = function injectContext(consumersMap) {
    return function(Component) {
        return function Provider(props) {
            props = Object.assign({}, props);
            return React.createElement(reduce(consumersMap, reducer, Component));

            function reducer(Wrapper, Consumer, propName) {
                return function() {
                    return React.createElement(Consumer, null, function(value) {
                        return React.createElement(Wrapper, ((props[propName] = value), props));
                    });
                };
            }
        };
    };
};
