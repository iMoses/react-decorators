import classNames from '../class-names';
import { shallow, mount } from 'enzyme';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import React from 'react';

describe('@classNames', () => {

    @classNames
    class TestComponent extends React.Component {

        render() {
            const { divClass, spanClass, codeClass, children } = this.props;
            const PropsComponent = props => props.child;
            return (
                <div className={divClass}>
                    <span className={spanClass} />
                    <PropsComponent child={<code className={codeClass} />} />
                    <strong>{children}</strong>
                </div>
            );
        }

    }

    const el = shallow(
        <TestComponent
            divClass="div-class"
            codeClass={{'code-class': 1, 'ignore-class': null}}
            spanClass={[{spanClass: true, ignoreClass: false}, 'extra-class']}>
            Child
        </TestComponent>
    );

    it('validate `children` is not being lost', () => {
        expect(el.find('strong').text()).to.equal('Child');
    });

    it('transforms a string className', () => {
        expect(el.find('div').props().className).to.equal('div-class');
    });

    it('transforms a nested object/array className', () => {
        expect(el.find('span').props().className).to.include('spanClass');
        expect(el.find('span').props().className).to.include('extra-class');
        expect(el.find('span').props().className).to.not.include('ignoreClass');
    });

    it('transforms a property element className', () => {
        const { className } = el
            .find('PropsComponent').shallow()
            .find('code').props();
        expect(className).to.include('code-class');
        expect(className).to.not.include('ignore-class');
    });

});
