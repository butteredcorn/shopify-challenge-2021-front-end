import { render, screen, cleanup, fireEvent, getByText } from '@testing-library/react';
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import ApolloClientProvider from '../../providers/ApolloProvider'
import ThemesProvider from '../../providers/ThemeProvider'
import MovieDetails from '../MovieDetails';
import {lightTheme, darkTheme} from '../../styles/common/theme.css'

const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

afterEach(cleanup);

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "localhost:4000/movie",
      state: "shopify_challenge_2021"
    })
}));

it('renders the Light Theme backgorund color for movie-details-container', () => {
    render(<ApolloClientProvider><BrowserRouter><ThemesProvider><MovieDetails /></ThemesProvider></BrowserRouter></ApolloClientProvider>);
    const MyHomeRoots = document.getElementsByClassName("movie-details-container")
    const style = window.getComputedStyle(MyHomeRoots[0])
    expect(rgb2hex(style.backgroundColor)).toBe(lightTheme.bg.primary)
});

it('renders the Dark Theme background color for movie-details-container after Theme toggle is clicked.', () => {
    const {container} = render(<ApolloClientProvider><BrowserRouter><ThemesProvider><MovieDetails /></ThemesProvider></BrowserRouter></ApolloClientProvider>);
    fireEvent(
        getByText(container, 'light Theme'),
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true
        })
    )
    const MyHomeRoots = document.getElementsByClassName("movie-details-container")
    const style = window.getComputedStyle(MyHomeRoots[0])
    expect(rgb2hex(style.backgroundColor)).toBe(darkTheme.bg.primary)
});

it('matches a snapshot', () => {
  const json = renderer.create(<ApolloClientProvider><BrowserRouter><ThemesProvider><MovieDetails /></ThemesProvider></BrowserRouter></ApolloClientProvider>).toJSON();
  expect(json).toMatchSnapshot();
});