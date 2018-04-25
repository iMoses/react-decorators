import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import cssModules from '../css-modules';

Enzyme.configure({adapter: new Adapter});

describe('@cssModules', () => {

    const styles = {
        'div-class':   'div-class-name',
        'code-class':  'code-class-name',
        'spanClass':   'span-class-name',
        'ignoreClass': 'should-not-appear'
    };

    describe('React.Component', () => {

        @cssModules(styles)
        class TestComponent extends React.Component {

            render() {
                const { divClass, spanClass, codeClass } = this.props;
                const PropsComponent = props => props.child;
                return (
                    <div className={divClass}>
                        <span className={spanClass} />
                        <PropsComponent child={<code className={codeClass} />} />
                    </div>
                );
            }

        }

        const el = shallow(
            <TestComponent
                divClass="div-class"
                codeClass="code-class"
                spanClass={[{spanClass: true, ignoreClass: false}, 'extra-class']}
            />
        );

        it('transform a string className', () => {
            expect(el.find('div').props().className).to.equal('div-class-name');
        });

        it('transform a nested object/array className', () => {
            expect(el.find('span').props().className).to.include('span-class-name');
            expect(el.find('span').props().className).to.include('extra-class');
            expect(el.find('span').props().className).to.not.include('spanClass');
            expect(el.find('span').props().className).to.not.include('ignoreClass');
            expect(el.find('span').props().className).to.not.include('should-not-appear');
        });

        it('transform a property element className', () => {
            expect(el
                .find('PropsComponent').shallow()
                .find('code').props().className
            ).to.include('code-class-name');
        });

        it('transform className inside a portal', () => {});

        it('transform className inside fragments', () => {});

    });

    describe('Stateless Component', () => {

        const TestComponent = cssModules(styles)(props =>
            <div className={props.divClass}>
                <span className={props.spanClass} />
            </div>
        );

        const el = shallow(
            <TestComponent
                divClass="div-class"
                spanClass={[{spanClass: true, ignoreClass: false}, 'extra-class']} />
        );

        it('transform a string className', () => {
            expect(el.find('div').props().className).to.equal('div-class-name');
        });

        it('transform a nested object/array className', () => {
            expect(el.find('span').props().className).to.include('span-class-name');
            expect(el.find('span').props().className).to.include('extra-class');
            expect(el.find('span').props().className).to.not.include('spanClass');
            expect(el.find('span').props().className).to.not.include('ignoreClass');
            expect(el.find('span').props().className).to.not.include('should-not-appear');
        });

    });

});
