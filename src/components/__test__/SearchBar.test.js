import { render, screen, cleanup } from '@testing-library/react';
import ThemesProvider from '../../providers/ThemeProvider'
import renderer from 'react-test-renderer'
import SearchBar from '../SearchBar';

afterEach(cleanup);

it('renders SearchBar component with title "Movie title"', () => {
  render(<ThemesProvider><SearchBar/></ThemesProvider>);
  const message = screen.getByText(/Movie title/i);
  expect(message).toBeInTheDocument();
});

it('matches a snapshot', () => {
  const json = renderer.create(<ThemesProvider><SearchBar/></ThemesProvider>).toJSON();
  expect(json).toMatchSnapshot();
});