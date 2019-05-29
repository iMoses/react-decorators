import forwardRef from '../forward-ref';
import { mount, render } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

describe('@forwardRef', () => {

    @forwardRef
    class TestComponent extends React.Component {

        render() {
            const { forwardedRef, ...props } = this.props;
            return (
                <div {...props} id="test" data-id="test-data-id" ref={forwardedRef} />
            );
        }

    }

    it('validate ref has been forwarded', () => {
        const ref = React.createRef();
        const el = mount(
            <code>
                <TestComponent ref={ref} title="my-title">
                    Child
                </TestComponent>
            </code>
        );
        expect(el.find('#test').instance()).to.equal(ref.current);
        expect(el.childAt(0).instance()).not.to.equal(ref.current);
    });

    it('validate props aggregation', () => {
        const ref = React.createRef();
        const el = mount(
            <code>
                <TestComponent ref={ref} title="my-title">
                    Child
                </TestComponent>
            </code>
        );
        expect(el.find('#test').prop('title')).to.equal('my-title');
        expect(el.find('#test').prop('data-id')).to.equal('test-data-id');
        expect(ref.current.getAttribute('data-id')).to.equal('test-data-id');
    });

});
