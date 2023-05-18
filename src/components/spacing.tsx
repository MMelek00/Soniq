import React from 'react';
import styled from 'styled-components/native';

type Props = {
  height?: number;
  width?: number;
  backgroundColor?: string;
};
const StyledView = styled.View<Props>`
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: ${props => props.backgroundColor};
`;
const Spacing: React.FC<Props> = ({
  height,
  width,
  backgroundColor = '#ffff',
}) => {
  return <StyledView style={{height, width, backgroundColor}} />;
};

export default Spacing;
