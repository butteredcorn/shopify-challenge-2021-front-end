import { render, screen, cleanup, fireEvent, getByText } from '@testing-library/react';
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import ThemesProvider from '../../providers/ThemeProvider'
import Home from '../Home';
import {lightTheme, darkTheme} from '../../styles/common/theme.css'

const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

afterEach(cleanup);

it('renders Home component with "No Nominations Yet! Nominate some movies to get started." and "Movie results will show here after you search." if prop "nominations" is set to empty array and no search has been conducted.', () => {
  render(<BrowserRouter><ThemesProvider><Home nominations={[]}/></ThemesProvider></BrowserRouter>);
  expect(screen.getByText(/Movie results will show here after you search./i)).toBeInTheDocument();
  expect(screen.getByText(/No Nominations Yet! Nominate some movies to get started./i)).toBeInTheDocument();
});

it('renders Home component without "No Nominations Yet! Nominate some movies to get started." if prop "nominations" is set to an array with one movie object.', () => {
    render(<BrowserRouter><ThemesProvider><Home nominations={[{Title: "Shopify Challenge - Front End Developer!", Year: "2021", imdbID: "the_shoppies"}]}/></ThemesProvider></BrowserRouter>);
    const nonExistantMessage = screen.queryByText(/No Nominations Yet! Nominate some movies to get started./i);
    expect(nonExistantMessage).toBeNull();
});

it('renders the Light Theme backgorund color for home-container', () => {
    render(<BrowserRouter><ThemesProvider><Home nominations={[]}/></ThemesProvider></BrowserRouter>);
    const MyHomeRoots = document.getElementsByClassName("home-container")
    const style = window.getComputedStyle(MyHomeRoots[0])
    expect(rgb2hex(style.backgroundColor)).toBe(lightTheme.bg.primary)
});

it('renders the Dark Theme background color for home-container after Theme toggle is clicked.', () => {
    const {container} = render(<BrowserRouter><ThemesProvider><Home nominations={[]}/></ThemesProvider></BrowserRouter>);
    fireEvent(
        getByText(container, 'light Theme'),
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true
        })
    )
    const MyHomeRoots = document.getElementsByClassName("home-container")
    const style = window.getComputedStyle(MyHomeRoots[0])
    expect(rgb2hex(style.backgroundColor)).toBe(darkTheme.bg.primary)
});

it('matches a snapshot', () => {
  const json = renderer.create(<BrowserRouter><ThemesProvider><Home nominations={[{Title: "Shopify Challenge - Front End Developer!", Year: "2021", imdbID: "the_shoppies"}]}/></ThemesProvider></BrowserRouter>).toJSON();
  expect(json).toMatchSnapshot();
});