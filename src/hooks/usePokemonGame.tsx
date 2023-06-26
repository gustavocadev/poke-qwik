import { useComputed$, useContext } from '@builder.io/qwik';
import { PokemonGameContext } from '~/context';

export const usePokemonGame = () => {
  const pokemonGame = useContext(PokemonGameContext);

  return {
    pokemonId: useComputed$(() => pokemonGame.pokemonId),
    showBackImage: useComputed$(() => pokemonGame.showBackImage),
    isPokemonVisible: useComputed$(() => pokemonGame.isPokemonVisible),
  };
};
