import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('6 - Testa o componente <Pokemon.js />', () => {
  it('É renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const buttonNext = screen.getByTestId('next-pokemon');
    pokemons.forEach(
      ({
        name,
        type,
        averageWeight: { value, measurementUnit },
        image: imageUrl,
      }) => {
        const pokemonName = screen.getByTestId('pokemon-name', { name });
        const pokemonType = screen.getByTestId('pokemon-type', { name: type });
        const pokemonWeightValue = screen.getByTestId('pokemon-weight', {
          name: `Average weight: ${value} ${measurementUnit}`,
        });
        const pokemonSprite = screen.getByAltText(`${name} sprite`);

        expect(pokemonName).toBeInTheDocument();
        expect(pokemonType).toBeInTheDocument();
        expect(pokemonWeightValue).toBeInTheDocument();
        expect(pokemonSprite.src).toBe(imageUrl);
        userEvent.click(buttonNext);
      },
    );
  });

  it(`No card do pokemon indicado no card, contém um link
   que leva para página de detalhes`, () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });

    expect(linkMoreDetails).toHaveAttribute('href', '/pokemons/25');
  });

  it(`Ao clicar no link "Mais Detalhes" é feito o redirecionamento
  para a página de detalhes do pokémon`, () => {
    const { history } = renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkMoreDetails);

    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Existe um ícone de estrela nos pokémon favoritados', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkMoreDetails);

    const favorite = screen.getByLabelText(/favoritado/i);
    userEvent.click(favorite);

    const starIcon = screen.getByAltText(/is marked as favorite/i);
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(starIcon).toBeVisible();
  });
});
