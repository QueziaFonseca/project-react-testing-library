import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste o componente <App.js />', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo delinks de navegação.',
    () => {
      const { history } = renderWithRouter(<App />);

      // testando a pagina Home
      const Homelink = screen.getAllByRole('link', { name: /home/i });
      expect(Homelink).toBeDefined();

      const Aboutlink = screen.getAllByRole('link', { name: /About/i });
      expect(Aboutlink).toBeDefined();

      const FavoritePokémonslink = screen.getAllByRole('link',
        { name: /Favorite Pokémons/i });
      expect(FavoritePokémonslink).toBeDefined();
      console.log(history);
    });

  test('Teste se ao clicar no link Home redireciona para a página inicial (URL /).', (
  ) => {
    const { history } = renderWithRouter(<App />);

    const Homelink = screen.getByRole('link', { name: /home/i });

    userEvent.click(Homelink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
    const title = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(title).toBeInTheDocument();
  });

  test(`Teste se ao clicar no link About redireciona à página de About, 
  na URL /about,.`, () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });

    userEvent.click(aboutLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
    const title = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(title).toBeInTheDocument();
  });

  test(`Teste se ao clicar no link Home redireciona à página de About, na URL 
  /favorites,.`, () => {
    const { history } = renderWithRouter(<App />);

    const favoritesLink = screen.getByRole('link', { name: /favorite/i });

    userEvent.click(favoritesLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
    const title = screen.getByRole('heading', { name: /Favorite pokémons/i });
    expect(title).toBeInTheDocument();
  });

  test('', () => {});
});
