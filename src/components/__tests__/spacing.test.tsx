/**
 * @format
 */

import 'react-native';
import React from 'react';

import renderer from 'react-test-renderer';
import Spacing from '../spacing';
describe('GenericText', () => {
  it('renders correctly with Error', () => {
    const tree = renderer.create(
      <Spacing backgroundColor={'red'} height={16} />,
    );
    expect(tree).toMatchSnapshot();
  });
});
