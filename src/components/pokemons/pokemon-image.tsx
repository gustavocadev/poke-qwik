import {
  component$,
  useComputed$,
  useSignal,
  useTask$,
} from '@builder.io/qwik';

export interface PokemonImageProps {
  id: number | string;
  size?: number;
  backImage?: boolean;
  isVisible?: boolean;
}

export const PokemonImage = component$<PokemonImageProps>(
  ({ id = 1, size = 100, backImage = false, isVisible = true }) => {
    const imageLoaded = useSignal(false);
    useTask$(({ track }) => {
      track(() => id);

      imageLoaded.value = false;
    });

    const imageUrl = useComputed$(() => {
      if (id === '') return;

      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        backImage ? 'back' : ''
      }/${id}.png`;
    });
    return (
      <figure class="flex flex-col items-center justify-center">
        {!imageLoaded.value && <span>Cargando...</span>}
        <img
          src={imageUrl.value}
          alt="A pokemon"
          width={size}
          height={size}
          onLoad$={() => {
            imageLoaded.value = true;
          }}
          class={[
            {
              hidden: !imageLoaded.value,
              'brightness-0': !isVisible,
            },
            'transition-all',
          ]}
        />
      </figure>
    );
  }
);
