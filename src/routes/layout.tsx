import { component$, Slot } from '@builder.io/qwik';
import { Link, type RequestHandler } from '@builder.io/qwik-city';
import { PokemonProvider } from '~/context/pokemon/PokemonProvider';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  return (
    <PokemonProvider>
      <header class="bg-base-200">
        <nav class="flex justify-between px-12 py-8">
          <figure>
            <Link href="/">
              <h2>Logo</h2>
            </Link>
          </figure>
          <div class="flex gap-4">
            <Link href="/pokemons/list-ssr">SSR-List</Link>
            <Link href="/pokemons/list-client">SSR Client-List</Link>
            <Link href="/counter/">Counter</Link>
          </div>
        </nav>
      </header>
      <main class="container mx-auto">
        <Slot />
      </main>
    </PokemonProvider>
  );
});
