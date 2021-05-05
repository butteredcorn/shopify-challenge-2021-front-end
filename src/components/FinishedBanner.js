import styled from 'styled-components'
import '../styles/components/FinishedBanner.css'

const BannerContainer = styled.div`
    background-color: ${props => props.theme.bg.primary};
    color: ${props => props.theme.text.primary};
    border: 1px solid ${props => props.theme.bg.primary};
`

const Banner = styled.div`
    background-color: ${props => props.theme.bg.secondary};
    color: ${props => props.theme.text.tertiary};
    border: 1px solid ${props => props.theme.bg.primary};
`

const FinishedBanner = () => {
    return (
        <BannerContainer className="banner-container">
            <Banner>
                <h2>Thank you for submitting your nominations for Shoppies!</h2>
            </Banner>
        </BannerContainer>
    );
  };
export default FinishedBanner;