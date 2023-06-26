import { component$, useContext } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

export const useDynamicIdLoader = routeLoader$(({ params }) => {
  const id = params.id;
  return {
    id,
  };
});

export default component$(() => {
  const dynamicIdLoader = useDynamicIdLoader();

  const pokemonGame = useContext(PokemonGameContext);
  return (
    <>
      <h2>Hello world</h2>
      <p>id: {dynamicIdLoader.value.id}</p>
      <PokemonImage
        id={Number(dynamicIdLoader.value.id)}
        backImage={pokemonGame.showBackImage}
        isVisible={pokemonGame.isPokemonVisible}
      />
    </>
  );
});
