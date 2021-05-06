import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import ThemesProvider from '../../providers/ThemeProvider'
import NotFound from '../NotFound';

afterEach(cleanup);

it('renders NotFound component with message "404 - Not Found!"', () => {
  render(<BrowserRouter><ThemesProvider><NotFound/></ThemesProvider></BrowserRouter>);
  const message = screen.getByText(/404 - Not Found!/i);
  expect(message).toBeInTheDocument();
});

it('matches a snapshot', () => {
  const json = renderer.create(<BrowserRouter><ThemesProvider><NotFound/></ThemesProvider></BrowserRouter>).toJSON();
  expect(json).toMatchSnapshot();
});