import 'react-native';
import React from 'react';

import renderer from 'react-test-renderer';
import Container from '../container';
import GenericText from '../genericText';
describe('Container', () => {
  it('renders correctly with Error', () => {
    const tree = renderer.create(
      <Container>
        <GenericText size={32} text="Normal Text" />,
      </Container>,
    );
    expect(tree).toMatchSnapshot();
  });
});
