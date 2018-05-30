import React from 'react';
import Square from './game';
import { shallow } from 'enzyme';

test('renders without crashing', () =>{
    shallow(<Square />);
});