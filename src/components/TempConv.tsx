import { useMachine } from '@xstate/react';
import { createMachine, assign } from 'xstate';

interface TemperatureContext {
  C?: number | string;
  F?: number | string;
}

type TemperatureEvent =
  | {
      type: 'CELSIUS';
      value: string;
    }
  | {
      type: 'FAHRENHEIT';
      value: string;
    };

const temperatureMachine = createMachine<TemperatureContext, TemperatureEvent>({
  initial: 'active',
  context: { C: undefined, F: undefined },
  states: {
    active: {
      on: {
        CELSIUS: {
          actions: assign({
            C: (_, event) => event.value,
            F: (_, event) =>
              event.value.length ? +event.value * (9 / 5) + 32 : '',
          }),
        },
        FAHRENHEIT: {
          actions: assign({
            C: (_, event) =>
              event.value.length ? (+event.value - 32) * (5 / 9) : '',
            F: (_, event) => event.value,
          }),
        },
      },
    },
  },
});

export const TempConv = () => {
  const [state, send] = useMachine(temperatureMachine);

  const { C, F } = state.context;

  return (
    <section>
      <label>
        <input
          type="number"
          id="celsius"
          value={C}
          onChange={(e) => {
            send('CELSIUS', { value: e.target.value });
          }}
          placeholder="e.g., 0"
        />
        <span>˚C</span>
      </label>
      <div>=</div>
      <label>
        <input
          type="number"
          id="fahrenheit"
          value={F}
          onChange={(e) => {
            send('FAHRENHEIT', { value: e.target.value });
          }}
          placeholder="e.g., 32"
        />
        <span>˚F</span>
      </label>
    </section>
  );
};
