import { render, screen, cleanup } from '@testing-library/react';
import ThemesProvider from '../../providers/ThemeProvider'
import renderer from 'react-test-renderer'
import FinishedBanner from '../FinishedBanner';

afterEach(cleanup);

it('renders FinishedBanner component with message "Thank you for submitting your nominations for Shoppies!"', () => {
  render(<ThemesProvider><FinishedBanner/></ThemesProvider>);
  const message = screen.getByText(/Thank you for submitting your nominations for Shoppies!/i);
  expect(message).toBeInTheDocument();
});

it('matches a snapshot', () => {
  const json = renderer.create(<ThemesProvider><FinishedBanner/></ThemesProvider>).toJSON();
  expect(json).toMatchSnapshot();
});