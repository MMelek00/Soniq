import 'react-native';
import React from 'react';

import renderer from 'react-test-renderer';
import Image from '../Image';

describe('<Image />', () => {
  it('renders correctly with Error', () => {
    const mockUrl = 'https://api.slingacademy.com/public/sample-photos/6.jpeg';
    const tree = renderer.create(
      <Image url={mockUrl} width={22} height={35} />,
    );
    expect(tree).toMatchSnapshot();
  });
});
