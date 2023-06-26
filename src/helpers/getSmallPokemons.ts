import type { PokemonListResponse } from '~/types/pokemonListResponse';
import type { SmallPokemon } from '~/types/smallPokemon';

export const getSmallPokemons = async (
  offset: string = '0',
  limit: string = '10'
): Promise<SmallPokemon[]> => {
  const pokeUrl = new URL('https://pokeapi.co/api/v2/pokemon');

  pokeUrl.searchParams.set('limit', limit);
  pokeUrl.searchParams.set('offset', offset);

  const resp = await fetch(pokeUrl.href);
  const data = (await resp.json()) as PokemonListResponse;

  const smallPokemon = data.results.map((pokemon) => {
    return {
      id: pokemon.url.split('/').at(-2)!,
      name: pokemon.name,
    };
  });

  return smallPokemon;
};
