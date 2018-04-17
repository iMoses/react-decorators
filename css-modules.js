import React from 'react';
import classNames from 'classnames/bind';

export default styles => Component => isStateless(Component)
    ? props => transformElement(Component(props), classNames.bind(styles))
    : class StyledComponent extends Component {
        render() { return transformElement(super.render(), classNames.bind(styles)); }
    };

function extend(obj, prop, value) {
    obj && (obj[prop] = value);
    return obj;
}

function transformElement(el, cx) {
    if (!el || !el.props) {
        // no props currently means that this is in fact a portal, not an element
        // therefore we only transform the children, we cannot clone it
        return extend(el, 'children', recursiveTransform(el.children, cx));
    }

    let className = el.props.className;
    if (className) {
        className = cx(splitStrings(className));
    }
    return React.cloneElement(el, {...el.props, className}, recursiveTransform(el.props.children, cx));
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

function recursiveTransform(el, cx) {
    if (React.isValidElement(el)) {
        return transformElement(el, cx);
    }
    if (Array.isArray(el)) {
        return React.Children.map(el, child => recursiveTransform(child, cx));
    }
    return el;
}

function isStateless(Component) {
    return !('prototype' in Component && typeof Component.prototype.render === 'function');
}
