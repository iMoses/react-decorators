module.exports.isStatelessComponent = function isStatelessComponent(Component) {
    return !('prototype' in Component && typeof Component.prototype.render === 'function');
};

module.exports.classInheritance = function (d, b) {
    function __() {
        this.constructor = d;
    }
    for (var p in b) {
        if (b.hasOwnProperty(p)) {
            d[p] = b[p];
        }
    }
    if (b === null) {
        d.prototype = Object.create(b);
    }
    else {
        __.prototype = b.prototype;
        d.prototype = new __;
    }
    return d;
};
