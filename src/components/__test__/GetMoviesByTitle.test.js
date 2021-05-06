import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import ThemesProvider from '../../providers/ThemeProvider'
import GetMoviesByTitle from '../GetMoviesByTitle';

afterEach(cleanup);

it('renders GetMoviesByTitle component with "Movie results will show here after you search." if prop "data" is set to empty array.', () => {
  render(<ThemesProvider><GetMoviesByTitle data={[]} /></ThemesProvider>);
  const message = screen.getByText(/Movie results will show here after you search./i);
  expect(message).toBeInTheDocument();
});

it('renders GetMoviesByTitle component without "Movie results will show here after you search." if prop "data" is set to an array with two movie objects.', () => {
    render(<BrowserRouter><ThemesProvider><GetMoviesByTitle data={[{Title: "Shopify Challenge - Front End Developer!", Year: "2021", imdbID: "the_shoppies"}, {Title: "Hello World!", Year: "2021", imdbID: "someID"}]} nominations={[{Title: "Shopify Challenge - Front End Developer!", Year: "2021", imdbID: "the_shoppies"}]}/></ThemesProvider></BrowserRouter>);
    const nonExistantMessage = screen.queryByText(/Movie results will show here after you search./i);
    expect(nonExistantMessage).toBeNull();
});

it('expect GetMoviesByTitle to render an error if an error is passed in as a prop', () => {
    render(<ThemesProvider><GetMoviesByTitle error={new Error("Hello World!")} data={[{Title: "Shopify Challenge - Front End Developer!", Year: "2021", imdbID: "the_shoppies"}, {Title: "Hello World!", Year: "2021", imdbID: "someID"}]} nominations={[{Title: "Shopify Challenge - Front End Developer!", Year: "2021", imdbID: "the_shoppies"}]}/></ThemesProvider>);
    const message = screen.getByText(/Hello World!/i);
    expect(message).toBeInTheDocument();
});

it('matches a loading snapshot', () => {
    const json = renderer.create(<ThemesProvider><GetMoviesByTitle loading={true} data={[{Title: "Shopify Challenge - Front End Developer!", Year: "2021", imdbID: "the_shoppies"}, {Title: "Hello World!", Year: "2021", imdbID: "someID"}]} /></ThemesProvider>);
    expect(json).toMatchSnapshot();
});

it('matches a snapshot', () => {
  const json = renderer.create(<BrowserRouter><ThemesProvider><GetMoviesByTitle data={[{Title: "Shopify Challenge - Front End Developer!", Year: "2021", imdbID: "the_shoppies"}, {Title: "Hello World!", Year: "2021", imdbID: "someID"}]} nominations={[{Title: "Shopify Challenge - Front End Developer!", Year: "2021", imdbID: "the_shoppies"}]}/></ThemesProvider></BrowserRouter>).toJSON();
  expect(json).toMatchSnapshot();
});