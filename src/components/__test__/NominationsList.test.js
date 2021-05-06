import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import ThemesProvider from '../../providers/ThemeProvider'
import NominationsList from '../NominationsList';

afterEach(cleanup);

it('renders NominationsList component with "No Nominations Yet! Nominate some movies to get started." if prop "data" is set to empty array.', () => {
  render(<ThemesProvider><NominationsList data={[]} /></ThemesProvider>);
  const message = screen.getByText(/No Nominations Yet! Nominate some movies to get started./i);
  expect(message).toBeInTheDocument();
});

it('renders NominationsList component without "No Nominations Yet! Nominate some movies to get started." if prop "data" is set to an array with two movie objects.', () => {
    render(<BrowserRouter><ThemesProvider><NominationsList data={[{Title: "Shopify Challenge - Front End Developer!", Year: "2021", imdbID: "the_shoppies"}, {Title: "Hello World!", Year: "2021", imdbID: "someID"}]} /></ThemesProvider></BrowserRouter>);
    const nonExistantMessage = screen.queryByText(/No Nominations Yet! Nominate some movies to get started./i);
    expect(nonExistantMessage).toBeNull();
});

it('expect NominationsList to be null if loading is true', () => {
    const {container} = render(<ThemesProvider><NominationsList loading={true} data={[{Title: "Shopify Challenge - Front End Developer!", Year: "2021", imdbID: "the_shoppies"}, {Title: "Hello World!", Year: "2021", imdbID: "someID"}]} /></ThemesProvider>);
    expect(container.firstChild).toBeNull();
});

it('expect NominationsList to render an error if an error is passed in as a prop', () => {
    render(<ThemesProvider><NominationsList error={new Error("Hello World!")} data={[{Title: "Shopify Challenge - Front End Developer!", Year: "2021", imdbID: "the_shoppies"}, {Title: "Hello World!", Year: "2021", imdbID: "someID"}]} /></ThemesProvider>);
    const message = screen.getByText(/Hello World!/i);
    expect(message).toBeInTheDocument();
});

it('matches a snapshot', () => {
  const json = renderer.create(<BrowserRouter><ThemesProvider><NominationsList data={[{Title: "Shopify Challenge - Front End Developer!", Year: "2021", imdbID: "the_shoppies"}, {Title: "Hello World!", Year: "2021", imdbID: "someID"}]}/></ThemesProvider></BrowserRouter>).toJSON();
  expect(json).toMatchSnapshot();
});