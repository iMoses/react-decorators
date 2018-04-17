import React from 'react';
import reduce from 'lodash/reduce';

export default consumersMap => Compoent =>
    reduce(consumersMap, (Compoent, Consumer, propName) =>
            props => <Consumer>{value => <Compoent {...props} {{[propName]: value}} />}</Consumer>,
        Compoent);
