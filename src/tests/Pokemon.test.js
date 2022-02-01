import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste o componente `<Pokemon.js />', () => {
  renderWithRouter(<App />);
  test(`Teste se é renderizado um card com as 
    informações de determinado pokémon`, () => {
    const pokemonName = screen.getByText(/Pikachu/i);
    expect(pokemonName).toBeInTheDocument();

    const pokemonType = screen.getAllByText(/Electric/i)[0];
    expect(pokemonType).toHaveAttribute('data-testid', 'pokemon-type');
    expect(pokemonType).toBeInTheDocument();

    const pokemonWeight = screen.getByText(/Average weight: 6.0 kg/i);
    expect(pokemonWeight).toBeInTheDocument();

    const img = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test(`Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para
   exibir detalhes deste Pokémon. O link deve
   possuir a URL '/pokemons/<id>', onde '<id>' é o id do Pokémon exibido`, () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    expect(link).toHaveAttribute('href', '/pokemons/25');
  });

  test(`Teste se ao clicar no link de navegação do 
  Pokémon, é feito o redirecionamento da aplicação 
  para a página de detalhes de Pokémon`, () => {
    const { history } = renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /more details/i });
    userEvent.click(link);

    const title = screen.getByRole('heading', { name: /pikachu details/i });
    expect(title).toBeInTheDocument();

    expect(history.location.pathname).toBe('/pokemons/25');

    const isFavoriteCheckbox = screen.getByRole('checkbox',
      { name: /pokémon favoritado\?/i });

    userEvent.click(isFavoriteCheckbox);

    const startIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(startIcon).toBeInTheDocument();
    expect(startIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});

test('', () => { });
