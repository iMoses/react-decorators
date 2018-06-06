var React = require('react');

/**
 *
 * @param Component
 * @param transformer
 * @returns {*}
 */
module.exports = function propertiesTransformer(Component, transformer) {
    if (isStatelessComponent(Component)) {
        return function(props) {
            return transformElement(Component(props), transformer);
        };
    }
    function TransformedComponent() {
        // Component.prototype.constructor.apply(this, arguments);
    }
    classInheritance(TransformedComponent, Component);
    TransformedComponent.prototype.render = function() {
        return transformElement(
            Component.prototype.render.apply(this, arguments),
            transformer
        );
    };
    return TransformedComponent;
};

/**
 *
 * @param Component
 * @returns {boolean}
 */
function isStatelessComponent(Component) {
    return !('prototype' in Component && typeof Component.prototype.render === 'function');
}

/**
 *
 * @param child
 * @param parent
 * @returns {*}
 */
function classInheritance(child, parent) {
    child.prototype = Object.create(parent && parent.prototype, {
        constructor: {
            value: child,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    Object.setPrototypeOf(child, parent);
    return child;
}

/**
 *
 * @param el
 * @param cb
 * @returns {*}
 */
function transformElement(el, cb) {
    if (el) {
        if (el.props) {
            var props = {};
            cb(Object.assign(props, el.props), el);
            Object.keys(props).forEach(function(propName) {
                if (propName !== 'children' && React.isValidElement(props[propName])) {
                    props[propName] = transformElement(props[propName], cb);
                }
            });
            el = React.cloneElement(el, props, recursiveTransform(props.children, cb));
        }
        else {
            // no props currently means that this is in fact a portal, not an element
            // therefore we only transform the children, we cannot clone it
            el.children = recursiveTransform(el.children, cb);
        }
    }
    return el;
}

/**
 *
 * @param el
 * @param cb
 * @returns {*}
 */
function recursiveTransform(el, cb) {
    if (React.isValidElement(el)) {
        return transformElement(el, cb);
    }
    if (Array.isArray(el)) {
        return React.Children.map(el, function(child) {
            return recursiveTransform(child, cb);
        });
    }
    return el;
}
