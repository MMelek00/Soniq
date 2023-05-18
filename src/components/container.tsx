import * as React from 'react';
import styled from 'styled-components/native';

const StyledContainer = styled.SafeAreaView`
  flex: 1;
  background: #e5e5e5;
`;

const Container: React.FC<React.PropsWithChildren> = ({children}) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
