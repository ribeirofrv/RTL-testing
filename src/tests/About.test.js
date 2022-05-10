import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import About from '../components/About';

describe('2 - Testa o componente <About.js />', () => {
  it('Contém um heading "h2" com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);

    const titleAbout = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(titleAbout).toBeInTheDocument();
  });

  it('Contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const textOne = /this application simulates a pokédex/i;
    const paragraphOne = screen.getByText(textOne);
    expect(paragraphOne).toBeInTheDocument();

    const textTwo = /filter pokémons by type/i;
    const paragraphTwo = screen.getByText(textTwo);
    expect(paragraphTwo).toBeInTheDocument();
  });

  it('Contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const image = screen.getByAltText(/pokédex/i);
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(image.src).toContain(url);
  });
});
