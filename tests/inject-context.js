import injectContext from '../inject-context';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

describe('@injectContext', () => {

    const consumers = {};

    describe('React.Component', () => {

        @injectContext(consumers)
        class TestComponent extends React.Component {

            render() {
                return null;
            }

        }

        const el = shallow(
            <TestComponent />
        );

    });

    describe('Stateless Component', () => {

        const TestComponent = injectContext(consumers)(props => null);

        const el = shallow(
            <TestComponent />
        );

    });

});
