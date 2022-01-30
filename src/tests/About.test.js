import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste o componente `<About.js />.`', () => {
  test('Teste se a página contém um heading "h2"com o texto "About Pokédex".', () => {
    renderWithRouter(<About />);

    const pageTitle = screen.getByRole('heading', { name: /about pokédex/i });
    expect(pageTitle).toBeDefined();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const paragraphsArray = screen.getAllByText(/pokémons/i);
    expect(paragraphsArray).toHaveLength(2);
  });

  test('- Teste se a página contém a seguinte imagem de uma Pokédex: `https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png`', () => {
    renderWithRouter(<About />);

    const image = screen.getByRole('img', { name: /pokédex/i });
    expect(image).toBeDefined();
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
