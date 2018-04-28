var propertiesTransformer = require('./lib/properties-transformer');
var _classNames = require('classnames');

/**
 *
 * @param Component
 * @returns {*}
 */
module.exports = function classNames(Component) {
    return propertiesTransformer(Component, function(props) {
        if (props.className) {
            props.className = _classNames(splitStrings(props.className));
        }
    });
};

module.exports.splitStrings = splitStrings;

/**
 *
 * @param className
 * @returns {*}
 */
function splitStrings(className) {
    if (Array.isArray(className)) {
        return className.map(splitStrings);
    }
    if (typeof className === 'string') {
        return className.split(/\s+/g);
    }
    return className;
}
