import { useMachine } from '@xstate/react';
import { createMachine, assign } from 'xstate';

interface CounterContext {
  count: number;
}

type CounterEvent = {
  type: 'INCREMENT';
};

const counterMachine = createMachine<CounterContext, CounterEvent>({
  id: 'counter',
  initial: 'active',
  context: { count: 0 },
  states: {
    active: {
      on: {
        INCREMENT: {
          actions: assign({
            count: (ctx) => ctx.count + 1,
          }),
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
