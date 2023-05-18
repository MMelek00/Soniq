/**
 * @format
 */

import 'react-native';
import React from 'react';

import renderer from 'react-test-renderer';
import GenericText, {TextType} from '../genericText';
describe('GenericText', () => {
  it('renders correctly with Error', () => {
    const tree = renderer.create(
      <GenericText
        type={TextType.Error}
        size={32}
        text="An error occurred..."
      />,
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly with Normal Text', () => {
    const tree = renderer.create(
      <GenericText type={TextType.Normal} size={32} text="Normal Text" />,
    );
    expect(tree).toMatchSnapshot();
  });
});
