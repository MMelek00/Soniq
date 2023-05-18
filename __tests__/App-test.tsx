/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import GenericText, {TextType} from '../src/components/genericText';

it('renders correctly', () => {
  const tree = renderer.create(
    <GenericText type={TextType.Error} size={32} text="An error occurred..." />,
  );
  expect(tree).toMatchSnapshot();
});
