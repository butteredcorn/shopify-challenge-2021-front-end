import { render, screen, cleanup } from '@testing-library/react';
import ThemesProvider from '../../providers/ThemeProvider'
import renderer from 'react-test-renderer'
import Error from '../Error';

afterEach(cleanup);

it('renders Error component with message "Hello World!"', () => {
  render(<ThemesProvider><Error message={"Hello World!"}/></ThemesProvider>);
  const message = screen.getByText(/Hello World!/i);
  expect(message).toBeInTheDocument();
});

it('matches a snapshot', () => {
  const json = renderer.create(<ThemesProvider><Error message={"Hello World!"}/></ThemesProvider>).toJSON();
  expect(json).toMatchSnapshot();
});