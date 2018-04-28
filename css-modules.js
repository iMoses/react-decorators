var propertiesTransformer = require('./lib/properties-transformer');
var _classNames = require('classnames/bind');
var classNames = require('./class-names');

/**
 *
 * @param styles
 * @returns {function(*=): *}
 */
module.exports = function cssModules(styles) {
    return function(Component) {
        var cx = _classNames.bind(styles);
        return propertiesTransformer(Component, function(props) {
            if (props.className) {
                props.className = cx(classNames.splitStrings(props.className));
            }
        });
    };
};
