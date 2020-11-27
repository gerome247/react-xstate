// @ts-nocheck
import { useMachine } from '@xstate/react';
import { createMachine, assign } from 'xstate';

interface CounterContext {
  count: number;
}

type CounterEvent = {
  type: 'INCREMENT';
};

const assignCount = assign({
  count: (context) => context?.count + 1,
});

const counterMachine = createMachine<CounterContext, CounterEvent>({
  id: 'counter',
  initial: 'active',
  context: { count: 0 },
  states: {
    active: {
      on: {
        INCREMENT: {
          actions: assignCount,
        },
      },
    },
  },
});

const Counter = () => {
  const [state, send] = useMachine(counterMachine);

  return (
    <section>
      <output>{state.context.count}</output>
      <button onClick={() => send('INCREMENT')}>Count</button>
    </section>
  );
};

export { Counter };
