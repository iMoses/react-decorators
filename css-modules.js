var classNames = require('classnames/bind');
var utils = require('./utils');
var React = require('react');

module.exports = function cssModules(styles) {
    return function(Component) {
        if (utils.isStatelessComponent(Component)) {
            return function(props) {
                return transformElement(Component(props), classNames.bind(styles));
            };
        }
        function StyledComponent() {
            Component.prototype.constructor.apply(this, arguments);
        }
        utils.classInheritance(StyledComponent, Component);
        StyledComponent.prototype.render = function() {
            return transformElement(
                Component.prototype.render.apply(this, arguments),
                classNames.bind(styles)
            );
        };
        return StyledComponent;
    };
};

function transformElement(el, cx) {
    if (el) {
        if (el.props) {
            var props = Object.assign({}, el.props);
            Object.keys(props).forEach(function(propName) {
                if (React.isValidElement(props[propName])) {
                    props[propName] = transformElement(props[propName], cx);
                }
            });
            if (props.className) {
                props.className = cx(splitStrings(props.className));
            }
            el = React.cloneElement(el, props, recursiveTransform(props.children, cx));
        }
        else {
            // no props currently means that this is in fact a portal, not an element
            // therefore we only transform the children, we cannot clone it
            el.children = recursiveTransform(el.children, cx);
        }
    }
    return el;
}

function recursiveTransform(el, cx) {
    if (React.isValidElement(el)) {
        return transformElement(el, cx);
    }
    if (Array.isArray(el)) {
        return React.Children.map(el, function(child) {
            return recursiveTransform(child, cx);
        });
    }
    return el;
}

function splitStrings(className) {
    if (Array.isArray(className)) {
        return className.map(splitStrings);
    }
    if (typeof className === 'string') {
        return className.split(/\s+/g);
    }
    return className;
}
