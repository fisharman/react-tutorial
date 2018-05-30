import React from 'react';
import Board from './game';
import { shallow } from 'enzyme';

test('renders without crashing', () =>{
    shallow(<Board />);
});