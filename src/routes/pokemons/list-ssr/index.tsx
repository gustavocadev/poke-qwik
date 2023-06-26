import { $, component$, useSignal, useStore } from '@builder.io/qwik';
import { Form, Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { Modal } from '~/components/shared/modal/modal';
import { getSmallPokemons } from '~/helpers/getSmallPokemons';
import type { SmallPokemon } from '~/types/smallPokemon';

export const usePokemonList = routeLoader$<SmallPokemon[]>(
  async ({ query }) => {
    const offset = query.get('offset') ?? '10';

    const smallPokemons = await getSmallPokemons(offset);

    return smallPokemons;
  }
);

export default component$(() => {
  const pokemonList = usePokemonList();

  const counter = useSignal(10);

  const loc = useLocation();

  const modalVisible = useSignal(false);
  const modalPokemon = useStore({
    id: '',
    name: '',
  });

  // modal function
  const showModal = $((id: string, name: string) => {
    modalPokemon.id = id;
    modalPokemon.name = name;
    modalVisible.value = true;
  });

  const closeModal = $(() => void (modalVisible.value = false));

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span class="">
          Current offset: {loc.url.searchParams.get('offset') ?? '0'}
        </span>
        <span>Esta cargando pagina: {loc.isNavigating ? 'Si' : 'No  '}</span>
      </div>

      <div class="mt-10 flex gap-4">
        <Link class="btn btn-primary mr-2">Anteriores</Link>

        <Form>
          <input type="hidden" name="offset" value={counter.value} />
          <button
            type="submit"
            class="btn btn-primary mr-2"
            onClick$={() => (counter.value += 10)}
          >
            Siguientes
          </button>
        </Form>
      </div>

      <div class="grid grid-cols-6 mt-5">
        {pokemonList.value.map((pokemon) => {
          return (
            <div
              key={pokemon.id}
              onClick$={() => showModal(pokemon.id, pokemon.name)}
              class="m-5 flex flex-col justify-center items-center cursor-pointer"
            >
              <PokemonImage id={Number(pokemon.id)} />
              <span class="capitalize">{pokemon.name}</span>
            </div>
          );
        })}
      </div>

      <Modal
        showModal={modalVisible.value}
        closeFn={closeModal}
        persistent={true}
        size="md"
      >
        <div q:slot="title">Nombre del Pokemon</div>
        <div q:slot="content" class="flex flex-col justify-center items-center">
          <PokemonImage id={modalPokemon.id} />
          <span>Preguntandole a ChatGPT</span>
        </div>
      </Modal>
    </>
  );
});
