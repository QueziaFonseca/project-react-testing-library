import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente `<Pokedex.js />`', () => {
  test(`Teste se página contém um heading 'h2' com o texto
   'Encountered pokémons'.`, () => {
    renderWithRouter(<App />);
    const pageTitle = screen.getByRole('heading',
      { name: /encountered pokémons/i,
        level: 2 });
    expect(pageTitle).toBeDefined();
  });

  test(`Teste se é exibido o próximo Pokémon da lista
      quando o botão 'Próximo pokémon' é clicado.`, () => {
    renderWithRouter(<App />);
    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextPokemonButton).toBeDefined();

    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      userEvent.click(nextPokemonButton);
    });
    expect(firstPokemon).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getAllByTestId('pokemon-name');
    expect(pokemonName).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
    const arrayTypes = ['Electric', 'Fire', 'Bug',
      'Poison', 'Psychic', 'Normal', 'Dragon'];
    const pokemonTypesArray = screen.getAllByTestId(/pokemon-type-button/i);
    expect(pokemonTypesArray).toHaveLength(arrayTypes.length);

    // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
    const electricButton = screen.getByRole('button', { name: /electric/i });
    expect(electricButton).toBeInTheDocument();
    userEvent.click(electricButton);
    const electricType = screen.getByTestId('pokemon-type');
    expect(electricType.innerHTML).toBe('Electric');

    // O botão `All` precisa estar **sempre** visível.
    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();
    expect(allButton.innerHTML).toBe('All');
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();
    expect(allButton.innerHTML).toBe('All');
    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(allButton);
    pokemons.forEach((pokemon) => {
      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName).toHaveTextContent(pokemon.name);
      userEvent.click(nextPokemonButton);
    });
  });
});
