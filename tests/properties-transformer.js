import propertiesTransformer from '../lib/properties-transformer';
import { mount, shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import React from 'react';
import _ from 'lodash';

describe('propertiesTransformer', () => {

    describe('transform functional component', () => {

        const StatelessComponent = propertiesTransformer(
            props => <div {...props} />,
            props => {
                if (props.id) {
                    props.id = _.kebabCase(props.id);
                }
            }
        );

        const ExternalComponent = props => <div id="Unaffected!!!" {...props} />;

        const el = shallow(
            <StatelessComponent id="My Class Component">
                <h1 id={`my TITLE with some(!) Special-chars in??`}>child headline</h1>
                <ExternalComponent>
                    <h2 id="Another title: this one a bit better...">nested headline</h2>
                </ExternalComponent>
            </StatelessComponent>
        );

        it('validate a recursive properties transformation', () => {
            expect(el.find('div').props().id).to.equal('my-class-component');
            expect(el.find('h1').props().id).to.equal('my-title-with-some-special-chars-in');
            expect(el.find('h2').props().id).to.equal('another-title-this-one-a-bit-better');
        });

        it(`validate it doesn't affect external components`, () => {
            expect(el.find(ExternalComponent).shallow().props().id).to.equal('Unaffected!!!');
        });

    });

    describe('transform React.Component', () => {

        const ClassComponent = propertiesTransformer(
            class extends React.Component {
                render() {
                    return <div {...this.props} />;
                }
            },
            props => {
                if (props.id) {
                    props.id = _.kebabCase(props.id);
                }
            }
        );

        const ExternalComponent = props => <div id="Unaffected!!!" {...props} />;

        const el = shallow(
            <ClassComponent id="My Class Component">
                <h1 id={`my TITLE with some(!) Special-chars in??`}>child headline</h1>
                <ExternalComponent>
                    <h2 id="Another title: this one a bit better...">nested headline</h2>
                </ExternalComponent>
            </ClassComponent>
        );

        it('validate a recursive properties transformation', () => {
            expect(el.find('div').props().id).to.equal('my-class-component');
            expect(el.find('h1').props().id).to.equal('my-title-with-some-special-chars-in');
            expect(el.find('h2').props().id).to.equal('another-title-this-one-a-bit-better');
        });

        it(`validate it doesn't affect external components`, () => {
            expect(el.find(ExternalComponent).shallow().props().id).to.equal('Unaffected!!!');
        });

    });

    describe('transform React.Fragment', () => {

        const FragmentComponent = propertiesTransformer(
            props => <React.Fragment><div {...props} /></React.Fragment>,
            props => {
                if (props.id) {
                    props.id = _.kebabCase(props.id);
                }
            }
        );

        const ExternalComponent = props => <div id="Unaffected!!!" {...props} />;

        const el = shallow(
            <FragmentComponent id="My Class Component">
                <h1 id={`my TITLE with some(!) Special-chars in??`}>child headline</h1>
                <ExternalComponent>
                    <h2 id="Another title: this one a bit better...">nested headline</h2>
                </ExternalComponent>
            </FragmentComponent>
        );

        it('validate a recursive properties transformation', () => {
            expect(el.find('div').props().id).to.equal('my-class-component');
            expect(el.find('h1').props().id).to.equal('my-title-with-some-special-chars-in');
            expect(el.find('h2').props().id).to.equal('another-title-this-one-a-bit-better');
        });

        it(`validate it doesn't affect external components`, () => {
            expect(el.find(ExternalComponent).shallow().props().id).to.equal('Unaffected!!!');
        });

    });

    describe('transform ReactDOM.Portal', () => {

        const dom = new JSDOM('<!DOCTYPE html><div id="root"></div>');

        global.document = dom.window.document;

        const FragmentComponent = propertiesTransformer(
            props => ReactDOM.createPortal(
                <div {...props} />,
                dom.window.document.getElementById('root')
            ),
            props => {
                if (props.id) {
                    props.id = _.kebabCase(props.id);
                }
            }
        );

        const ExternalComponent = props => <section id="Unaffected!!!" {...props} />;

        const el = mount(
            <FragmentComponent id="My Class Component">
                <h1 id={`my TITLE with some(!) Special-chars in??`}>child headline</h1>
                <ExternalComponent>
                    <h2 id="Another title: this one a bit better...">nested headline</h2>
                </ExternalComponent>
            </FragmentComponent>
        );

        it('validate a recursive properties transformation', () => {
            expect(el.find('div').at(0).props().id).to.equal('my-class-component');
            expect(el.find('h1').props().id).to.equal('my-title-with-some-special-chars-in');
            expect(el.find('h2').props().id).to.equal('another-title-this-one-a-bit-better');
        });

        it(`validate it doesn't affect external components`, () => {
            expect(el.find('section').at(0).props().id).to.equal('Unaffected!!!');
        });

    });

});
