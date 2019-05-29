var React = require('react');

/**
 *
 * @returns {function}
 */
module.exports = function forwardRef(Component) {
    return React.forwardRef((props, ref) =>
        <Component {...props} forwardedRef={ref} />);
};
