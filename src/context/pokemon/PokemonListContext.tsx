import { createContextId } from '@builder.io/qwik';
import type { SmallPokemon } from '~/types/smallPokemon';

export interface PokemonListState {
  currentPage: number;
  isLoading: boolean;
  pokemons: SmallPokemon[];
}

export const PokemonListContext = createContextId<PokemonListState>(
  'pokemon.list-context'
);
