import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste o componente `<FavoritePokemons.js />`', () => {
  test(`Teste se é exibido na tela a mensagem 'No favorite
    pokemon found' se a pessoa não tiver pokémons favoritos.`, () => {
    const { history } = renderWithRouter(<FavoritePokemons />);
    const paragrap = screen.getByText(/no favorite pokemon found/i);
    expect(paragrap).toBeDefined();
    console.log(history);
  });
});
test('', () => { });
