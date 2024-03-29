import { component$ } from '@builder.io/qwik';
import { useCounter } from '~/hooks/useCounter';

export default component$(() => {
  const { counter, increase, decrease } = useCounter(6);
  return (
    <section class="flex flex-col w-full items-center">
      <span class="text-2xl">Counter</span>
      <span class="text-7xl">{counter.value}</span>

      <div class="mt-2">
        <button class="btn btn-primary mr-2" onClick$={()=> decrease()}>-1</button>
        <button class="btn btn-primary" onClick$={()=> increase()}>+1</button>
      </div>
    </section>
  );
});
