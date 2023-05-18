import * as React from 'react';
import styled from 'styled-components/native';
type GenericTextProps = {
  type?: TextType;
  size?: number;
  text?: string;
};
export enum TextType {
  Header = 'header',
  Error = 'error',
  Normal = 'normal',
}
const StyledText = styled.Text<GenericTextProps>`
  font-size: ${props => props.size}px;
  color: ${props => (props.type === TextType.Error ? 'red' : 'black')};
  textalign: 'center';
  font-weight: ${props => (props.type === TextType.Header ? 'bold' : 'normal')};
  margin: 10px 0px;
`;

const GenericText = ({text = '', size = 14, type}: GenericTextProps) => {
  return (
    <StyledText size={size} type={type}>
      {text}
    </StyledText>
  );
};

export default GenericText;
