import styled from 'styled-components'

const ErrorMessage = styled.strong`
    color: ${props => props.theme.error.primary};
`
const Error = ({message}) => {
    return (
        <ErrorMessage>
            Error: {message}
        </ErrorMessage>
    );
  };
export default Error;