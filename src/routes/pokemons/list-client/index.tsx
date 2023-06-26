import {
  $,
  component$,
  useContext,
  useOnDocument,
  useTask$,
} from '@builder.io/qwik';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonListContext } from '~/context/pokemon/PokemonListContext';
import { getSmallPokemons } from '~/helpers/getSmallPokemons';
// import type { SmallPokemon } from '~/types/smallPokemon';

// interface PokemonPageState {
//   currentPage: number;
//   isLoading: boolean;
//   pokemons: SmallPokemon[];
// }

export default component$(() => {
  const pokemonList = useContext(PokemonListContext);

  useTask$(async ({ track }) => {
    track(() => pokemonList.currentPage);

    pokemonList.isLoading = true;

    const pokemons = await getSmallPokemons(
      String(pokemonList.currentPage * 10),
      '30'
    );

    pokemonList.pokemons = [...pokemonList.pokemons, ...pokemons];

    pokemonList.isLoading = false;
  });

  useOnDocument(
    'scroll',
    $(() => {
      const maxScroll = document.body.scrollHeight;
      const currentScroll = window.scrollY + window.innerHeight;

      if (currentScroll >= maxScroll && !pokemonList.isLoading) {
        pokemonList.isLoading = true;
        pokemonList.currentPage += 1;
      }
    })
  );
  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span class="">Pagina actual: {pokemonList.currentPage}</span>
        <span>Esta cargando: </span>
      </div>

      <div class="mt-10 flex gap-4">
        {/* <button
          type="submit"
          class="btn btn-primary mr-2"
          onClick$={() => {
            pokemonState.currentPage -= 1;
          }}
        >
          Anteriores
        </button> */}

        <button
          type="submit"
          class="btn btn-primary mr-2"
          onClick$={() => {
            pokemonList.currentPage += 1;
          }}
        >
          Siguientes
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
        {pokemonList.pokemons.map((pokemon) => {
          return (
            <div
              key={pokemon.id}
              class="m-5 flex flex-col justify-center items-center "
            >
              <PokemonImage id={Number(pokemon.id)} />
              <span class="capitalize">{pokemon.name}</span>
            </div>
          );
        })}
      </div>
    </>
  );
});
