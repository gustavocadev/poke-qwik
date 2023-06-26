import { component$, useContext } from '@builder.io/qwik';
import { Link, type DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

export default component$(() => {
  const pokemonGame = useContext(PokemonGameContext);
  return (
    <main class="container mx-auto">
      <section class="flex flex-col items-center mt-14">
        <h1 class="text-6xl">{pokemonGame.pokemonId}</h1>
        <Link href={`/pokemon/${pokemonGame.pokemonId}`}>
          <PokemonImage
            id={pokemonGame.pokemonId}
            size={150}
            backImage={pokemonGame.showBackImage}
            isVisible={pokemonGame.isPokemonVisible}
          />
        </Link>
        <div class="flex gap-5">
          <button
            onClick$={() => {
              if (pokemonGame.pokemonId > 1) pokemonGame.pokemonId--;

              return pokemonGame.pokemonId;
            }}
            class="btn btn-primary"
          >
            Anterior
          </button>
          <button
            onClick$={() => pokemonGame.pokemonId++}
            class="btn btn-primary"
          >
            Siguiente
          </button>

          <button
            onClick$={() =>
              (pokemonGame.showBackImage = !pokemonGame.showBackImage)
            }
            class="btn btn-secondary"
          >
            Voltear
          </button>

          <button
            onClick$={() =>
              (pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible)
            }
            class="btn btn-neutral"
          >
            Revelar
          </button>
        </div>
      </section>
    </main>
  );
});

export const head: DocumentHead = {
  title: 'Home Page',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
