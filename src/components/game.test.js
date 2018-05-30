import React from 'react';
import Game from './game';
import { shallow } from 'enzyme';

test('renders without crashing', () =>{
    shallow(<Game />);
});