import 'react-native';
import React from 'react';

import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react-native';

import PressableButton from '../pressableButton';
describe('PressableButton', () => {
  const mockPress = jest.fn();
  const title = 'Press me!';

  const renderButton = () => {
    return render(
      <PressableButton
        bgColor={'darkslateblue'}
        onPress={mockPress}
        title={title}
      />,
    );
  };
  it('renders correctly', () => {
    const tree = renderer.create(
      <PressableButton
        bgColor={'darkslateblue'}
        onPress={mockPress}
        title="Do something"
      />,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should find the button title', () => {
    const {getByText} = renderButton();

    const foundButtonTitle = getByText(title);

    expect(foundButtonTitle.props.children).toEqual(title);
  });
  it('onPress work correctly', () => {
    const {getByTestId} = renderButton();

    const MockButton = getByTestId('PressableButton');
    fireEvent.press(MockButton);
    expect(mockPress).toHaveBeenCalled();
  });
});
