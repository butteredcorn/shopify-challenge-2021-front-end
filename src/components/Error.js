import styled from 'styled-components'

const ErrorContainer = styled.strong`
    color: ${props => props.theme.error.primary};
`
const Error = ({message}) => {
    return (
        <ErrorContainer>
            Error: {message}
        </ErrorContainer>
    );
  };
export default Error;