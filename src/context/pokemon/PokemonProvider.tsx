import {
  Slot,
  component$,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from '@builder.io/qwik';
import {
  PokemonGameContext,
  type PokemonGameState,
} from './PokemonGameContext';
import {
  PokemonListContext,
  type PokemonListState,
} from './PokemonListContext';

export const PokemonProvider = component$(() => {
  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 4,
    showBackImage: true,
    isPokemonVisible: false,
  });

  const pokemonList = useStore<PokemonListState>({
    currentPage: 0,
    isLoading: false,
    pokemons: [],
  });

  useContextProvider(PokemonGameContext, pokemonGame);
  useContextProvider(PokemonListContext, pokemonList);

  useVisibleTask$(() => {
    const pokemon = localStorage.getItem('pokemon-game');

    if (!pokemon) return;

    pokemonGame.isPokemonVisible = JSON.parse(pokemon).isPokemonVisible;
    pokemonGame.pokemonId = JSON.parse(pokemon).pokemonId;
    pokemonGame.showBackImage = JSON.parse(pokemon).showBackImage;
  });

  useVisibleTask$(({ track }) => {
    track(() => [
      pokemonGame.isPokemonVisible,
      pokemonGame.pokemonId,
      pokemonGame.showBackImage,
    ]);

    localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame));
  });
  return <Slot />;
});
