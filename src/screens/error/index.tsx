import * as React from 'react';
import GenericText, {TextType} from '../../components/genericText';
import styled from 'styled-components/native';
import Container from '../../components/container';
import PressableButton from '../../components/pressableButton';

type Props = {
  resetError: () => void;
};
const StyledContainer = styled.View`
  flex: 1;
  justify-content: 'center';
  align-items: 'center';
  background: #e5e5e5;
`;

const ErrorScreen: React.FC<Props> = ({resetError}) => {
  return (
    <Container>
      <StyledContainer>
        <GenericText
          type={TextType.Error}
          size={32}
          text="An error occurred..."
        />
      </StyledContainer>
      <PressableButton
        bgColor={'darkslateblue'}
        onPress={resetError}
        title="Go home"
      />
    </Container>
  );
};

export default ErrorScreen;
