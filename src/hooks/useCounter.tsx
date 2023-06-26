import { useSignal } from '@builder.io/qwik';

export const useCounter = (initialValue: number = 5) => {
  const counter = useSignal(initialValue);

  const increase = () => {
    counter.value++;
  };

  const decrease = () => {
    counter.value--;
  };

  return {
    counter,
    increase,
    decrease,
  };
};
