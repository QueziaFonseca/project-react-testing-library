import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste o componente `<NotFound.js />`', () => {
  test(`Teste se página contém um heading "h2" com o texto
   "Page requested not found 😭"`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/URLqueNaoExiste');
    console.log(history); // ver pathname na chave entries
    const pageTitle = screen.getByRole('heading',
      { name: /page/i });
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Page requested not found');
  });

  test('Teste se página mostra a imagem "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/URLqueNaoExiste');
    const image = screen.getByRole('img',
      { name: /pikachu crying because the page requested was not found/i });
    expect(image).toBeDefined();
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
