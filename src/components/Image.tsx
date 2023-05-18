import * as React from 'react';
import styled from 'styled-components/native';
import {getWindowHeight, getWindowWidth} from '../utils/layout';
type ImageProps = {
  width: number;
  height: number;
  url: string;
};

const StyledImage = styled.Image<{width: number; height: number}>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: 5px;
`;

const Image = ({width, height, url}: ImageProps) => {
  return (
    <StyledImage
      source={{uri: url}}
      width={getWindowHeight(width)}
      height={getWindowWidth(height)}
    />
  );
};

export default Image;
