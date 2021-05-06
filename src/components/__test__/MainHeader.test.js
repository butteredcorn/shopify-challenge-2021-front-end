import { render, screen, cleanup, fireEvent, getByText } from '@testing-library/react';
import renderer from 'react-test-renderer'
import {BrowserRouter} from 'react-router-dom'
import ThemesProvider from '../../providers/ThemeProvider'
import MainHeader from '../MainHeader';

afterEach(cleanup);

it('renders MainHeader component with title "The Shoppies"', () => {
  render(<BrowserRouter><ThemesProvider><MainHeader/></ThemesProvider></BrowserRouter>);
  expect(screen.getByText(/The Shoppies/i)).toBeInTheDocument();
});

it('renders MainHeader with the "Light Theme"', () => {
    render(<BrowserRouter><ThemesProvider><MainHeader/></ThemesProvider></BrowserRouter>);
    expect(screen.getByText(/Light Theme/i)).toBeInTheDocument();
});

it('renders MainHeader with "Dark Theme" when toggled', () => {
    const {container} = render(<BrowserRouter><ThemesProvider><MainHeader/></ThemesProvider></BrowserRouter>);
    fireEvent(
        getByText(container, 'light Theme'),
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true
        })
    )
    expect(screen.getByText(/Dark Theme/i)).toBeInTheDocument();
});

it('matches a snapshot', () => {
  const json = renderer.create(<BrowserRouter><ThemesProvider><MainHeader/></ThemesProvider></BrowserRouter>).toJSON();
  expect(json).toMatchSnapshot();
});