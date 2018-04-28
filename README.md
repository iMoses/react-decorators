# React-decorators

_A collection of react decorators to enhance components capabilities._

Feel free to open a PR with your own decorators. For large 
new features, please open an issue first.

## Installation

The package is currently available only on [npm](https://www.npmjs.com/).

```shell
npm install --save react-decorators
```

[![npm/react-decorators](https://nodei.co/npm/react-decorators.png?compact=true)](https://www.npmjs.org/package/react-decorators)

## Usage

## Decorators

- [classNames](#classnames)
- [cssModules](#cssmodules)
- [injectContext](#injectcontext)

### classNames

**What is does**

Injects the [classnames](https://github.com/JedWatson/classnames) package directly into React's `className` property.

> A simple JavaScript utility for conditionally joining classNames together.
> <br/>...<br/>
> The `classNames` function takes any number of arguments which can be a string or object.
> <br/>...<br/>
> If the value associated with a given key is falsy, that key won't be included in the output.

```javascript
@classNames
class MyComponent extends React.Component {

    render() {
        return (
            <div className="classnames-examples">
                <span className={['foo', 'bar']} /> {/* class="foo bar" */}
                <span className={{selected: false, visible: true}} /> {/* class="visible" */}
                <span className={[null, {active: true}, false, [{nested: true}]]} /> {/* class="active nested" */}
                <span className={{hasClass: false}} /> {/* class="" */}
            </div>
        );
    }

}
```

### cssModules

**What is does**

An extension of the [`classNames`](#classnames) decorator, it binds the 
[classnames](https://github.com/JedWatson/classnames) package to React's `className` property using the 
[alternate `bind` version](https://github.com/JedWatson/classnames#alternate-bind-version-for-css-modules) 
for [css-modules](https://github.com/css-modules/css-modules).

```
import styles from './styles.css';

@cssModules(styles)
class MyComponent extends React.Component {

    render() {
        return (
            <div className="my-class">
                // Content goes here
            </div>
        );
    }

}
```

Although it mixing between ES2015+ `imports` and CommonJS `require`, 
I find this syntax to be very readable.

```js
@cssModules(require('./my-component.scss'))
class MyComponent extends React.Component { ... }
```

### injectContext

**What is does**

This decorator receives a map of property names to context consumers, 
and injects these the consumers values as properties to the base component.

`injectContext({propName: Consumer[, ...]})`

```js
@injectContext({
    theme: ThemeConsumer,
})
class MyComponent extends React.Component {

    render() {
        return (
            <div className={this.props.theme.container}>
                // Content goes here
            </div>
        );
    }

}
```
