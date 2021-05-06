import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import ThemesProvider from '../../providers/ThemeProvider'
import GetMovieByID from '../GetMovieByID';

afterEach(cleanup);

class LocalStorageMock {
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key) {
      return this.store[key] || null;
    }
  
    setItem(key, value) {
      this.store[key] = String(value);
    }
  
    removeItem(key) {
      delete this.store[key];
    }
  };
  
global.localStorage = new LocalStorageMock;
localStorage.setItem("nominations", JSON.stringify([]));

it('renders GetMovieByID component with "Shopify Challenge" if prop "movie" is set to movie object.', () => {
  render(<ThemesProvider><GetMovieByID movie={{Title: "Shopify Challenge", Year: "2021", Genre: "Front End Developement", Rated: "E for Everyone", Runtime: "Life long journey", Director: "Justin Yee", Actors: "Justin Yee", Language: "Javascript, React, React Native, Node, C#, PHP, Python, Java, and more.", Metascore: "96", imdbRating: "9.6/10", imdbID: "#1"}} /></ThemesProvider>);
  const message = screen.getByText(/Shopify Challenge/i);
  expect(message).toBeInTheDocument();
});

it('renders GetMovieByID component with "Loading..." if prop "loading" is set to true', () => {
    render(<BrowserRouter><ThemesProvider><GetMovieByID loading={true} movie={{Title: "Shopify Challenge", Year: "2021", Genre: "Front End Developement", Rated: "E for Everyone", Runtime: "Life long journey", Director: "Justin Yee", Actors: "Justin Yee", Language: "Javascript, React, React Native, Node, C#, PHP, Python, Java, and more.", Metascore: "96", imdbRating: "9.6/10", imdbID: "#1"}} /></ThemesProvider></BrowserRouter>);
    const message = screen.queryByText(/Loading.../i);
    expect(message).toBeInTheDocument();
});

it('expect GetMovieByID to render an error if an error is passed in as a prop', () => {
    render(<ThemesProvider><GetMovieByID error={new Error("Hello World!")} movie={{Title: "Shopify Challenge", Year: "2021", Genre: "Front End Developement", Rated: "E for Everyone", Runtime: "Life long journey", Director: "Justin Yee", Actors: "Justin Yee", Language: "Javascript, React, React Native, Node, C#, PHP, Python, Java, and more.", Metascore: "96", imdbRating: "9.6/10", imdbID: "#1"}} /></ThemesProvider>);
    const message = screen.getByText(/Hello World!/i);
    expect(message).toBeInTheDocument();
});

it('matches a loading snapshot', () => {
    const json = renderer.create(<ThemesProvider><GetMovieByID loading={true} movie={{Title: "Shopify Challenge", Year: "2021", Genre: "Front End Developement", Rated: "E for Everyone", Runtime: "Life long journey", Director: "Justin Yee", Actors: "Justin Yee", Language: "Javascript, React, React Native, Node, C#, PHP, Python, Java, and more.", Metascore: "96", imdbRating: "9.6/10", imdbID: "#1"}} /></ThemesProvider>).toJSON();
    expect(json).toMatchSnapshot();
});

it('matches a snapshot', () => {
  const json = renderer.create(<BrowserRouter><ThemesProvider><GetMovieByID movie={{Title: "Shopify Challenge", Year: "2021", Genre: "Front End Developement", Rated: "E for Everyone", Runtime: "Life long journey", Director: "Justin Yee", Actors: "Justin Yee", Language: "Javascript, React, React Native, Node, C#, PHP, Python, Java, and more.", Metascore: "96", imdbRating: "9.6/10", imdbID: "#1"}} /></ThemesProvider></BrowserRouter>).toJSON();
  expect(json).toMatchSnapshot();
});