import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('1 - Testa comportamento do componente <App.js />', () => {
  it('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();

    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();

    const linkFavPokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkFavPokemons).toBeInTheDocument();
  });

  it('Ao clicar no link "Home" redireciona para URL "/"', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();
    userEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const titleHome = screen.getByRole('heading', { name: 'Pokédex' });
    expect(titleHome).toBeInTheDocument();
  });

  it('Ao clicar no link "About" redireciona para URL "/about"', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const titleAbout = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(titleAbout).toBeInTheDocument();
  });

  it('Ao clicar no link "Favorite Pokémons" redireciona para URL "/favorites"', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavPokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkFavPokemons).toBeInTheDocument();
    userEvent.click(linkFavPokemons);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const titleFav = screen.getByRole('heading', { name: 'Favorite pokémons' });
    expect(titleFav).toBeInTheDocument();
  });

  it('Ao entrar em uma URL desconhecida redireciona para a página "Not Found"', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pagina-que-nao-existe/');

    const notFound = screen.getByRole('heading', { name: /page requested not found/i });
    expect(notFound).toBeInTheDocument();
  });
});
