import injectContext from '../inject-context';
import { render, shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

describe('@injectContext', () => {

    const themeContext = React.createContext('default');
    const countContext = React.createContext(42);
    const thirdContext = React.createContext(true);

    const consumers = {
        theme: themeContext.Consumer,
        count: countContext.Consumer,
        third: thirdContext.Consumer,
    };

    @injectContext(consumers)
    class TestComponent extends React.Component {

        render() {
            return (
                <div data-count={this.props.count} title={this.props.title}>
                        <span>
                            {this.props.third && this.props.theme}
                            {this.props.third || this.props.count}
                        </span>
                    <div className="children">
                        {this.props.children}
                    </div>
                </div>
            );
        }

    }

    it('validate all properties have been injected', () => {
        const el = render(
            <TestComponent title="my-title">
                Child
            </TestComponent>
        );
        expect(el.attr('title')).to.equal('my-title');
        expect(el.find('span').text()).to.equal('default');
        expect(el.find('.children').text()).to.equal('Child');
    });

    it('validate that the context Provider works', () => {
        const el = render(
            <thirdContext.Provider value={false}>
                <TestComponent />
            </thirdContext.Provider>
        );
        expect(el.find('span').text()).to.equal('42');
    });

});
