# Overview

_A collection of react decorators to enhance components capabilities._

Feel free to open a PR with your own decorators. For large 
new features, please open an issue first.

**Everything is pretty much under construction.**

# Installation

The package is currently available only on [npm](https://www.npmjs.com/).

```shell
npm install --save react-decorators
```

[![npm/react-decorators](https://nodei.co/npm/react-decorators.png?compact=true)](https://www.npmjs.org/package/react-decorators)

# Decorators

## classNames

Using the `@classNames` decorator is equivalent to wrapping all `className` attributes with the `classNames` method.

```js
@classNames
class MyComponent extends React.Component {

    render() {
        return (
            <div className="simple-string">
                <span className={{selected: false, visible: true}} />
                <span className={['my-class', this.props.className, {nested: true}]} />
            </div>
        );
    }

}
```

## cssModules

Using the `@cssModules` decorator is equivalent to wrapping all `className` attributes with the `classNames.bind` method.

```js
import styles from './styles.css';

@cssModules(styles)
class MyComponent extends React.Component {

    render() {
        return (
            <div className="simple-string">
                <span className={{selected: false, visible: true}} />
                <span className={['my-class', this.props.className, {nested: true}]} />
            </div>
        );
    }

}
```

## injectContext

Using the `@injectContext` decorator wraps your components with multiple consumers and maps their values to the base component's `props`.

```js
const ThemeContext = React.createContext('default');
const DepthContext = React.createContext(0);

// ...

@injectContext({
    theme: ThemeContext.Consumer,
    depth: DepthContext.Consumer,
})
class MyComponent extends React.Component {

    render() {
        return (
            <div>
                <p>Active Theme: {this.props.theme}</p>
                <p>Current Depth: {this.props.depth}</p>
            </div>
        );
    }

}
```
