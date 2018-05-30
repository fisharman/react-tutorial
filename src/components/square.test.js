import React from 'react';
import Square from './square';
import { shallow } from 'enzyme';

test('renders without crashing', () =>{
    shallow(<Square />);
});